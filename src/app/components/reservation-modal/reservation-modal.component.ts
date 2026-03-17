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
  fecha: string = '';
  
  // NUEVAS VARIABLES PARA EL EVENTO
  tituloEvento: string = '';
  descripcionEvento: string = '';

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

  // --- LÓGICA DE SOLICITUD ---
  async enviarSolicitud() {
    // Pequeña validación extra por seguridad
    if (!this.fecha || !this.tituloEvento || !this.descripcionEvento) {
      this.presentToast('Por favor completa todos los campos', 'warning');
      return;
    }

    this.cargando = true;

    // Estructuramos la reserva con los nuevos campos
    const nuevaSolicitud = {
      idMusico: this.usuario?.id || 'invitado',
      nombreMusico: this.usuario?.nombreArtistico || this.usuario?.nombre || 'Músico',
      fotoMusico: this.usuario?.fotoPerfil || '',
      idLugar: this.lugar?.id,
      nombreLugar: this.lugar?.nombre,
      idDueno: this.lugar?.duenoId,
      fechaPerformance: this.fecha,
      
      // NUEVOS DATOS ENVIADOS A FIREBASE
      tituloEvento: this.tituloEvento,
      descripcionEvento: this.descripcionEvento,
      
      montoAcordado: this.lugar?.precio || 0,
      estado: 'pendiente', 
      fechaSolicitud: new Date()
    };

    try {
      // Guardamos en Firebase 
      await this.db.addFirestoreDocument('performances', nuevaSolicitud);
      
      this.cargando = false;
      
      // Pasamos directamente a la pantalla naranja de éxito
      this.paso = 2; 

    } catch (error) {
      this.cargando = false;
      this.presentToast('Error al procesar la solicitud', 'danger');
      console.error(error);
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