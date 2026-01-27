import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  segmentoActual: string = 'info';
  usuario: any;
  miLugar: any;
  reservas: any[] = [];
  solicitudes: any[] = [];
  cargando: boolean = true;
  paso: number = 1; // Solo si decides usar pasos en el perfil
  metodoSeleccionado: string = 'tarjeta'; 
  numTarjeta: string = '';
  quiereGuardar: boolean = true;

  constructor(
    public auth: AuthService,
    public db: DatabaseService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  detectarMarca(numero: string): string {
    if (numero.startsWith('4')) return 'Visa';
    if (numero.startsWith('5')) return 'Mastercard';
    return 'Tarjeta';
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
  }

  cargarDatosSegunRol() {
    if (this.usuario.rol === 'dueno' || this.usuario.rol === 'dueño') {
      this.db.getCollectionByCustomparam('lugares', 'duenoId', this.usuario.id)
        .subscribe((res: any) => {
          if (res && res.length > 0) this.miLugar = res[0];
        });
    } else {
      this.cargarReservas();
    }
  }

  cargarReservas() {
    const userId = this.usuario?.id;
    if (!userId) return;
    this.db.getDocumentById('users', userId).subscribe((userData: any) => {
      const idsReservas = userData?.reserva || [];
      this.reservas = [];
      idsReservas.forEach((lugarId: string) => {
        this.db.getDocumentById('lugares', lugarId).subscribe((lugarData: any) => {
          if (lugarData) this.reservas.push(lugarData);
        });
      });
    });
  }

  cargarSolicitudesSegunRol() {
    this.cargando = true;
    const user = this.auth.profile;
    if (!user) return;
    const rolField = (user.rol === 'dueño' || user.rol === 'dueno') ? 'idDueno' : 'idMusico';
    this.db.getCollectionByCustomparam('performances', rolField, user.id).subscribe(res => {
      this.solicitudes = res;
      this.cargando = false;
    });
  }

  async gestionarSolicitud(idSolicitud: string, nuevoEstado: 'confirmado' | 'rechazado') {
    try {
      await this.db.updateFireStoreDocument('performances', idSolicitud, { estado: nuevoEstado });
      const msg = nuevoEstado === 'confirmado' ? '¡Reserva Confirmada!' : 'Reserva rechazada.';
      this.presentToast(msg, nuevoEstado === 'confirmado' ? 'success' : 'danger');
    } catch (error) {
      this.presentToast('Error al procesar la solicitud', 'warning');
    }
  }

  async presentToast(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      color: color,
      position: 'bottom',
      mode: 'ios'
    });
    await toast.present();
  }

  contactarViaWhatsapp(s: any) {
    const fecha = new Date(s.fechaPerformance).toLocaleDateString();
    const mensaje = `¡Hola! Soy de ${s.nombreLugar}. Acepté tu propuesta para el show del ${fecha}. ¿Coordinamos?`;
    const url = `https://wa.me/591${s.telefonoMusico || ''}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }

  async presentAlertNuevaTarjeta() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva Tarjeta',
      inputs: [
        { name: 'numero', type: 'text', placeholder: 'Número de tarjeta' },
        { name: 'expiracion', type: 'text', placeholder: 'MM/AA' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Guardar', handler: (data) => this.guardarTarjeta(data) }
      ]
    });
    await alert.present();
  }

  async guardarTarjeta(datosTarjeta: any) {
    try {
      const nuevaTarjeta = {
        id: Date.now().toString(),
        marca: this.detectarMarca(datosTarjeta.numero),
        ultimos4: datosTarjeta.numero.slice(-4),
        expiracion: datosTarjeta.expiracion,
        tokenFake: 'tok_test_' + Math.random().toString(36).substr(2, 9)
      };
      const tarjetasActuales = this.usuario.metodosPago || [];
      await this.db.updateFireStoreDocument('users', this.usuario.id, {
        metodosPago: [...tarjetasActuales, nuevaTarjeta]
      });
      this.usuario.metodosPago = [...tarjetasActuales, nuevaTarjeta];
      this.presentToast('Tarjeta añadida con éxito', 'success');
    } catch (error) {
      this.presentToast('Error al guardar tarjeta', 'danger');
    }
  }

  async eliminarTarjeta(id: string) {
    const nuevasTarjetas = this.usuario.metodosPago.filter((t: any) => t.id !== id);
    await this.db.updateFireStoreDocument('users', this.usuario.id, { metodosPago: nuevasTarjetas });
    this.usuario.metodosPago = nuevasTarjetas;
    this.presentToast('Tarjeta eliminada', 'medium');
  }
}
