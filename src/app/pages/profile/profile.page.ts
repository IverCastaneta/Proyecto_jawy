import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastController, AlertController } from '@ionic/angular';

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
  paso: number = 1; 
  metodoSeleccionado: string = 'tarjeta'; 
  numTarjeta: string = '';
  quiereGuardar: boolean = true;

  misInstrumentos: string[] = [];
  misGeneros: string[] = [];

  isRechazoModalOpen: boolean = false;
  solicitudARechazar: any = null;
  motivoRechazo: string = '';
  comentarioRechazo: string = '';
  motivosPredeterminados: string[] = [
    'Fecha ya ocupada o no disponible',
    'El estilo musical no encaja con el lugar',
    'El lugar estará en mantenimiento',
    'Falta de requerimientos técnicos',
    'Otro motivo'
  ];

  isEditLugarModalOpen: boolean = false;
  lugarEditData: any = {};
  guardandoLugar: boolean = false;

  constructor(
    public auth: AuthService,
    public db: DatabaseService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.cargarBadges();
  }

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
    this.cargarBadges();
  }

  cargarBadges() {
    if (this.usuario && (this.usuario.instrumentos || this.usuario.generos)) {
      this.misInstrumentos = this.usuario.instrumentos || [];
      this.misGeneros = this.usuario.generos || [];
    } else {
      const datosGuardados = localStorage.getItem('temp_registro');
      if (datosGuardados) {
        const registro = JSON.parse(datosGuardados);
        this.misInstrumentos = registro.instrumentos || [];
        this.misGeneros = registro.generos || [];
      }
    }
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

  abrirModalRechazo(solicitud: any) {
    this.solicitudARechazar = solicitud;
    this.motivoRechazo = '';
    this.comentarioRechazo = '';
    this.isRechazoModalOpen = true;
  }

  cerrarModalRechazo() {
    this.isRechazoModalOpen = false;
    setTimeout(() => { this.solicitudARechazar = null; }, 300);
  }

  async confirmarRechazo() {
    if (!this.solicitudARechazar || !this.motivoRechazo) return;

    try {
      await this.db.updateFireStoreDocument('performances', this.solicitudARechazar.id, { 
        estado: 'rechazado',
        motivoRechazo: this.motivoRechazo,
        comentarioRechazo: this.comentarioRechazo
      });
      
      this.presentToast('Has rechazado esta solicitud', 'danger');
      this.cerrarModalRechazo();
    } catch (error) {
      this.presentToast('Hubo un error al rechazar', 'warning');
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

abrirModalEditLugar(event?: Event) {
    // Esto evita que al tocar el lapicito, también se haga clic en la tarjeta de fondo y nos lleve a otra página
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.lugarEditData = JSON.parse(JSON.stringify(this.miLugar));
    
    if (!this.lugarEditData.tipoLocal && this.lugarEditData.tipo) {
      this.lugarEditData.tipoLocal = this.lugarEditData.tipo;
    }
    if (!this.lugarEditData.equipamiento) {
      this.lugarEditData.equipamiento = [];
    }
    
    this.isEditLugarModalOpen = true;
  }

  cerrarModalEditLugar() {
    this.isEditLugarModalOpen = false;
  }

  async guardarCambiosLugar() {
    if (!this.lugarEditData.nombre || !this.lugarEditData.direccion) {
      this.presentToast('Por favor completa el nombre y la dirección', 'warning');
      return;
    }

    this.guardandoLugar = true;

    try {
      const datosActualizados = {
        nombre: this.lugarEditData.nombre,
        direccion: this.lugarEditData.direccion,
        descripcion: this.lugarEditData.descripcion || '',
        capacidad: this.lugarEditData.capacidad || '',
        equipamiento: this.lugarEditData.equipamiento || [],
        tipoLocal: this.lugarEditData.tipoLocal || 'Pub',
        tipo: this.lugarEditData.tipoLocal || 'Pub', 
        precioCover: this.lugarEditData.precioCover || 0
      };

      await this.db.updateFireStoreDocument('lugares', this.miLugar.id, datosActualizados);
      
      this.miLugar = { ...this.miLugar, ...datosActualizados };
      
      this.presentToast('Información actualizada correctamente', 'success');
      this.cerrarModalEditLugar();

    } catch (error) {
      console.error(error);
      this.presentToast('Hubo un error al actualizar los datos', 'danger');
    } finally {
      this.guardandoLugar = false;
    }
  }

}