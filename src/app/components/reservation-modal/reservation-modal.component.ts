import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.scss'],
})
export class ReservationModalComponent implements OnInit {
  @Input() lugar: any;

  cargando: boolean = false;
  usuario: any;
  paso: number = 1;
  metodoSeleccionado: string = '';
  fecha: string = '';
  mensaje: string = '';

  // Propiedades para capturar los datos de la tarjeta
  numTarjeta: string = '';
  quiereGuardar: boolean = true;

  constructor(
    private modalCtrl: ModalController,
    private db: DatabaseService,
    public auth: AuthService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.usuario = this.auth.profile;
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  // Lógica para detectar marca rápido
  detectarMarca(numero: string): string {
    if (numero.startsWith('4')) return 'Visa';
    if (numero.startsWith('5')) return 'Mastercard';
    return 'Tarjeta';
  }

  async confirmarReserva() {
    if (!this.fecha || !this.metodoSeleccionado) {
      this.presentToast('Por favor completa los datos', 'warning');
      return;
    }

    this.cargando = true;

    // PILOTO: Si es tarjeta y quiere guardar, lo registramos en su perfil de Firestore
    if (this.metodoSeleccionado === 'tarjeta' && this.quiereGuardar && this.numTarjeta) {
      const nuevaTarjeta = {
        id: Date.now().toString(),
        marca: this.detectarMarca(this.numTarjeta),
        ultimos4: this.numTarjeta.slice(-4),
        tokenFake: 'tok_' + Math.random().toString(36).substr(2, 5)
      };

      const tarjetasActuales = this.usuario.metodosPago || [];
      await this.db.updateFireStoreDocument('users', this.usuario.id, {
        metodosPago: [...tarjetasActuales, nuevaTarjeta]
      });
      // Actualizamos localmente para que se vea en el perfil
      this.usuario.metodosPago = [...tarjetasActuales, nuevaTarjeta];
    }

    const nuevaPerformance = {
      idMusico: this.usuario.id,
      nombreMusico: this.usuario.nombreArtistico || this.usuario.nombre,
      fotoMusico: this.usuario.fotoPerfil || '',
      idLugar: this.lugar.id,
      nombreLugar: this.lugar.nombre,
      idDueno: this.lugar.duenoId,
      fechaPerformance: this.fecha,
      mensaje: this.mensaje,
      monto: this.lugar.precio || 0,
      metodoPago: this.metodoSeleccionado,
      // Estado directo para saltar verificaciones en el piloto
      estado: 'pagado', 
      fechaSolicitud: new Date(),
      idTransaccion: 'JW-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };

    try {
      await this.db.addFirestoreDocument('performances', nuevaPerformance);
      
      // Delay visual para simular el procesamiento del pago
      setTimeout(() => {
        this.cargando = false;
        this.paso = 3; 
      }, 1500);

    } catch (error) {
      this.cargando = false;
      this.presentToast('Error al procesar la reserva', 'danger');
    }
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