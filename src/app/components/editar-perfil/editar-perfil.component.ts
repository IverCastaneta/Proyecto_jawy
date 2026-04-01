import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss'],
})
export class EditarPerfilComponent implements OnInit {
  @Input() usuario: any;
  
  // Objeto clonado para no afectar la vista antes de guardar
  perfilData: any = {};
  guardando: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private db: DatabaseService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    // Clonamos los datos actuales del usuario
    this.perfilData = { ...this.usuario };
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  async guardarCambios() {
    this.guardando = true;
    try {
    
      await this.db.updateFireStoreDocument('users', this.usuario.id, {
        nombreArtistico: this.perfilData.nombreArtistico || this.perfilData.nombre || '',
        biografia: this.perfilData.biografia || '',
        fotoPerfil: this.perfilData.fotoPerfil || ''
      });
      
      this.presentToast('Perfil actualizado con éxito', 'success');
    
      this.modalCtrl.dismiss(this.perfilData);
    } catch (error) {
      this.presentToast('Hubo un error al guardar', 'warning');
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