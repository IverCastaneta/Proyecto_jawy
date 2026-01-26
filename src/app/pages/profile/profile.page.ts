import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  // 1. PROPIEDAD QUE FALTABA: Esto quita los errores TS2339 de tu HTML
  segmentoActual: string = 'info'; 

  usuario: any; 
  miLugar: any; 
  reservas: any[] = []; 
  solicitudes: any[] = [];

  constructor(
    public auth: AuthService,
    public db: DatabaseService
  ) {}

  ngOnInit() {
    this.usuario = this.auth.profile;

    if (this.usuario) {
      this.cargarDatosSegunRol();
      // 2. IMPORTANTE: Llamamos a la carga de solicitudes aquí
      this.cargarSolicitudesSegunRol();
    } else {
      setTimeout(() => {
        this.usuario = this.auth.profile;
        if (this.usuario) {
          this.cargarDatosSegunRol();
          this.cargarSolicitudesSegunRol();
        }
      }, 500);
    }
  }

  cargarDatosSegunRol() {
    // TIP: Asegúrate de que en Firebase el rol sea 'dueno' sin tilde para evitar errores
    if (this.usuario.rol === 'dueno' || this.usuario.rol === 'dueño') {
      this.db.getCollectionByCustomparam('lugares', 'duenoId', this.usuario.id)
        .subscribe((res: any) => {
          if (res && res.length > 0) {
            this.miLugar = res[0];
          }
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
    const user = this.auth.profile;
    if (!user) return;
    
    // Ajustamos para que acepte tanto 'dueno' como 'dueño'
    if (user.rol === 'dueño' || user.rol === 'dueno') {
      this.db.getCollectionByCustomparam('performances', 'idDueno', user.id).subscribe(res => {
        this.solicitudes = res;
      });
    } else {
      this.db.getCollectionByCustomparam('performances', 'idMusico', user.id).subscribe(res => {
        this.solicitudes = res;
      });
    }
  }

  async gestionarSolicitud(idSolicitud: string, nuevoEstado: 'aceptado' | 'rechazado') {
    try {
    // 1. Actualizamos el estado en la colección 'performances' de Firebase
    await this.db.updateFireStoreDocument('performances', idSolicitud, {
      estado: nuevoEstado
    });
    
    console.log(`Solicitud marcada como: ${nuevoEstado}`);
    
    // 2. Opcional: Podrías añadir una alerta de éxito aquí
    // this.presentToast(`Propuesta ${nuevoEstado} con éxito`);
    
  } catch (error) {
    console.error('Error al actualizar el estado de la performance:', error);
  }
  }
  
}