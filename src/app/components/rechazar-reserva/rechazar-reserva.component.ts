import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-rechazar-reserva',
  templateUrl: './rechazar-reserva.component.html',
  styleUrls: ['./rechazar-reserva.component.scss'],
})
export class RechazarReservaComponent implements OnInit {
  @Input() solicitud: any;

  motivoSeleccionado: string = '';
  comentario: string = '';
  guardando: boolean = false;

  motivos: string[] = [
    'Fecha ya ocupada o no disponible',
    'El estilo musical no encaja con el lugar',
    'El lugar estará en mantenimiento',
    'Falta de requerimientos técnicos',
    'Otro motivo'
  ];

  constructor(
    private modalCtrl: ModalController,
    private db: DatabaseService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  cerrar() {
    this.modalCtrl.dismiss();
  }

  async confirmarRechazo() {
    if (!this.motivoSeleccionado) return;
    this.guardando = true;
    try {
      await this.db.updateFireStoreDocument('performances', this.solicitud.id, { 
        estado: 'rechazado',
        motivoRechazo: this.motivoSeleccionado,
        comentarioRechazo: this.comentario
      });
      this.presentToast('Solicitud rechazada', 'danger');
      this.modalCtrl.dismiss(true);
    } catch (error) {
      this.presentToast('Error al procesar el rechazo', 'warning');
    } finally {
      this.guardando = false;
    }
  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: color,
      mode: 'ios'
    });
    await toast.present();
  }
}