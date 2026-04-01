import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.scss'],
})
export class ReservationModalComponent implements OnInit {
  
  @Input() lugar: any;

  cargando: boolean = false;
  cargandoFechas: boolean = true; 
  usuario: any;
  
  paso: number = 1; 
  fecha: string = '';
  minDate: string = ''; 
  fechasOcupadas: string[] = [];

  tituloEvento: string = '';
  descripcionEvento: string = '';

  constructor(
    private modalCtrl: ModalController,
    private db: DatabaseService,
    public auth: AuthService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.usuario = this.auth.profile;
    const hoy = new Date();
    this.minDate = hoy.toISOString().split('T')[0];

    this.cargarFechasOcupadas();
  }

  cargarFechasOcupadas() {
    if (!this.lugar?.id) return;

    this.cargandoFechas = true;
    this.db.getCollectionByCustomparam('performances', 'idLugar', this.lugar.id)
      .pipe(take(1))
      .subscribe((res: any[]) => {
        this.fechasOcupadas = res
          .filter((p: any) => p.estado !== 'rechazado')
          .map((p: any) => p.fechaPerformance.split('T')[0]);
        
        this.cargandoFechas = false;
        console.log('Fechas bloqueadas cargadas correctamente');
      });
  }

  isDateAvailable = (dateString: string) => {
    const date = dateString.split('T')[0];
    return !this.fechasOcupadas.includes(date);
  };

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  async enviarSolicitud() {
    if (!this.fecha || !this.tituloEvento || !this.descripcionEvento) {
      this.presentToast('Por favor completa todos los campos', 'warning');
      return;
    }

    this.cargando = true;
    const fechaSeleccionada = this.fecha.split('T')[0];

    // Doble verificación de seguridad
    this.db.getCollectionByCustomparam('performances', 'idLugar', this.lugar.id)
      .pipe(take(1))
      .subscribe(async (reservasExistentes: any[]) => {
        
        const ocupado = reservasExistentes.find((res: any) => 
          res.fechaPerformance.split('T')[0] === fechaSeleccionada && 
          res.estado !== 'rechazado'
        );

        if (ocupado) {
          this.cargando = false;
          this.presentAlertOcupado(fechaSeleccionada);
          return;
        }

        this.procederConReserva(fechaSeleccionada);
      });
  }

  async procederConReserva(fechaLimpia: string) {
    const nuevaSolicitud = {
      idMusico: this.usuario?.id || 'invitado',
      nombreMusico: this.usuario?.nombreArtistico || this.usuario?.nombre || 'Músico',
      fotoMusico: this.usuario?.fotoPerfil || '',
      idLugar: this.lugar?.id,
      nombreLugar: this.lugar?.nombre,
      idDueno: this.lugar?.duenoId,
      fechaPerformance: fechaLimpia,
      tituloEvento: this.tituloEvento,
      descripcionEvento: this.descripcionEvento,
      montoAcordado: this.lugar?.precioCover || 0,
      estado: 'pendiente', 
      fechaSolicitud: new Date()
    };

    try {
      await this.db.addFirestoreDocument('performances', nuevaSolicitud);
      this.cargando = false;
      this.paso = 2; 
    } catch (error) {
      this.cargando = false;
      this.presentToast('Error al procesar la solicitud', 'danger');
    }
  }

  async presentAlertOcupado(fecha: string) {
    const f = fecha.split('-');
    const fechaFormateada = `${f[2]}/${f[1]}/${f[0]}`;

    const alert = await this.alertCtrl.create({
      header: 'Fecha No Disponible',
      message: `¡Vaya! Alguien se te adelantó para el día ${fechaFormateada}. Por favor selecciona otro día.`,
      buttons: ['ENTENDIDO'],
      mode: 'ios'
    });
    await alert.present();
  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: color,
      mode: 'ios',
      position: 'bottom'
    });
    await toast.present();
  }
}