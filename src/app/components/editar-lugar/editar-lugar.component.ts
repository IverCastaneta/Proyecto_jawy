import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-editar-lugar',
  templateUrl: './editar-lugar.component.html',
  styleUrls: ['./editar-lugar.component.scss'],
})
export class EditarLugarComponent implements OnInit {
  @Input() lugar: any;

  lugarEditData: any;
  guardando: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private db: DatabaseService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.lugarEditData = { ...this.lugar };
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  async guardarCambios() {
    this.guardando = true;
  try {
  // Corregido: 'S' mayúscula en FireStore
  await this.db.updateFireStoreDocument('lugares', this.lugar.id, this.lugarEditData);
  this.presentToast('Información actualizada correctamente', 'success');
  this.modalCtrl.dismiss(this.lugarEditData);
  } catch (error) {
      this.presentToast('Error al actualizar los datos', 'danger');
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