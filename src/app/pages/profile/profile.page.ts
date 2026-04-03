import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastController, AlertController, ModalController, IonicSafeString } from '@ionic/angular';

// COMPONENTES MODALES
import { EditarLugarComponent } from '../../components/editar-lugar/editar-lugar.component';
import { RechazarReservaComponent } from '../../components/rechazar-reserva/rechazar-reserva.component';
import { EditarPerfilComponent } from '../../components/editar-perfil/editar-perfil.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  segmentoActual: string = 'info';
  usuario: any;
  miLugar: any;
  reservas: any[] = [];
  solicitudes: any[] = [];
  cargando: boolean = true;
  misInstrumentos: string[] = [];
  misGeneros: string[] = [];

  constructor(
    public auth: AuthService,
    public db: DatabaseService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.cargarBadges();
  }

  ionViewWillEnter() {
    this.cargando = true;
    this.usuario = this.auth.profile;
    if (this.usuario) {
      this.cargarTodo();
    } else {
      setTimeout(() => {
        this.usuario = this.auth.profile;
        if (this.usuario) this.cargarTodo();
        else this.cargando = false;
      }, 1000);
    }
  }

  cargarTodo() {
    this.cargarDatosSegunRol();
    this.cargarSolicitudesSegunRol();
    this.cargarBadges();
  }

  cargarBadges() {
    if (this.usuario) {
      this.misInstrumentos = this.usuario.instrumentos || [];
      this.misGeneros = this.usuario.generos || [];
    }
  }

  cargarDatosSegunRol() {
    if (this.usuario.rol === 'dueno' || this.usuario.rol === 'dueño') {
      this.db.getCollectionByCustomparam('lugares', 'duenoId', this.usuario.id)
        .subscribe((res: any) => {
          if (res && res.length > 0) this.miLugar = res[0];
        });
    }
  }

  // --- LIMPIO: Solo carga las solicitudes, ya no tiene el espía ---
  cargarSolicitudesSegunRol() {
    this.cargando = true;
    const rolField = (this.usuario.rol === 'dueño' || this.usuario.rol === 'dueno') ? 'idDueno' : 'idMusico';
    
    this.db.getCollectionByCustomparam('performances', rolField, this.usuario.id).subscribe(res => {
      this.solicitudes = res;
      this.cargando = false;
    });
  }

  // --- LOGICA GESTION DE SOLICITUDES ACTUALIZADA ---
  async gestionarSolicitud(idSolicitud: string, nuevoEstado: 'confirmado' | 'rechazado') {
    try {
      let datosActualizar: any = { estado: nuevoEstado };

      if (nuevoEstado === 'confirmado') {
        datosActualizar.notificacionArtistaVista = false;
      }

      await this.db.updateFireStoreDocument('performances', idSolicitud, datosActualizar);
      
      if (nuevoEstado === 'confirmado') {
        this.mostrarPopUpDueno();
      } else {
        this.presentToast('Reserva rechazada', 'danger');
      }

    } catch (error) {
      this.presentToast('Error al procesar solicitud', 'warning');
    }
  }

async mostrarPopUpDueno() {
    const alert = await this.alertCtrl.create({
      header: '¡Reserva Confirmada! 🎉',
      message: 'Por favor, se recomienda preparar todo lo que se solicitó en el "Rider" (requerimientos del artista) y no disponer de esta fecha y espacio para otras actividades.\n\n💡 Recuerda: Mientras mejor sea tu trato y desempeño, mantendrás una buena calificación como usuario dentro de Jawy.',
      cssClass: 'jawy-success-alert',
      buttons: [{ text: '¡Entendido!', role: 'confirm', cssClass: 'btn-entendido-alert' }]
    });
    
    await alert.present();
  }


  async abrirModalRechazo(solicitud: any) {
    const modal = await this.modalCtrl.create({
      component: RechazarReservaComponent,
      componentProps: { solicitud: solicitud },
      mode: 'ios',
      initialBreakpoint: 0.7,
      breakpoints: [0, 0.7, 0.9]
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }

  async abrirModalEditLugar(event?: Event) {
    if (event) { event.preventDefault(); event.stopPropagation(); }
    const modal = await this.modalCtrl.create({
      component: EditarLugarComponent,
      componentProps: { lugar: this.miLugar },
      mode: 'ios',
      initialBreakpoint: 0.95,
      breakpoints: [0, 0.95, 1]
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) this.miLugar = { ...this.miLugar, ...data };
  }

  async presentToast(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje, duration: 2000, color: color, mode: 'ios'
    });
    await toast.present();
  }

  obtenerIconoInstrumento(instrumento: string): string {
    const n = instrumento.toLowerCase();
    if (n.includes('voz')) return 'mic';
    if (n.includes('dj')) return 'headset';
    if (n.includes('batería')) return 'radio-button-on';
    if (n.includes('guitarra')) return 'pulse-outline';
    return 'musical-note';
  }

  contactarViaWhatsapp(s: any) {
    const msg = `¡Hola! Soy de ${s.nombreLugar}. Acepté tu propuesta para el show. ¿Coordinamos?`;
    window.open(`https://wa.me/591${s.telefonoMusico}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  async abrirModalEditPerfil() {
    const modal = await this.modalCtrl.create({
      component: EditarPerfilComponent,
      componentProps: { usuario: this.usuario },
      mode: 'ios',
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.8, 1]
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.usuario = { ...this.usuario, ...data };
    }
  }

  async presentAlertNuevaTarjeta() { /* Lógica de alerta */ }
  async eliminarTarjeta(id: string) { /* Lógica eliminar */ }
}