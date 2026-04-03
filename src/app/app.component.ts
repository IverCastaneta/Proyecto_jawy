import { Component, OnInit } from '@angular/core';
import { AlertController, IonicSafeString } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  
  alertaMostrada: boolean = false;

  constructor(
    private alertCtrl: AlertController,
    private auth: AuthService,
    private db: DatabaseService
  ) {}

  ngOnInit() {
    this.verificarUsuarioYActivarEspia();
  }

  verificarUsuarioYActivarEspia() {
    // Intentamos obtener el perfil. Si no está, reintentamos cada segundo
    const intervalo = setInterval(() => {
      const usuario = this.auth.profile;

      if (usuario) {
        console.log('✅ Perfil detectado en App Component:', usuario.rol);
        clearInterval(intervalo); // Dejamos de buscar el perfil

        // Solo activamos si es músico/artista
        if (usuario.rol === 'musico' || usuario.rol === 'artista') {
          this.iniciarEspiaGlobal(usuario.id);
        }
      } else {
        console.log('⏳ Esperando perfil del usuario...');
      }
    }, 1000);

    // Seguridad: Si después de 10 segundos no hay nada, paramos para no gastar batería
    setTimeout(() => clearInterval(intervalo), 10000);
  }

  iniciarEspiaGlobal(usuarioId: string) {
    console.log('🕵️‍♂️ Espía global activado para músico:', usuarioId);

    this.db.getCollectionByCustomparam('performances', 'idMusico', usuarioId)
      .subscribe((reservas: any) => {
        console.log('Update de reservas recibido:', reservas.length);
        
        if (!this.alertaMostrada) {
          const reservaNueva = reservas.find((r: any) => 
            r.estado === 'confirmado' && r.notificacionArtistaVista === false
          );

          if (reservaNueva) {
            console.log('🔔 ¡Reserva nueva confirmada encontrada!', reservaNueva.id);
            this.alertaMostrada = true;
            this.mostrarPopUpArtista(reservaNueva);
          }
        }
      });
  }

async mostrarPopUpArtista(reserva: any) {
    // Los signos de interrogación (?) evitan errores si reserva viene vacío
    const titulo = reserva?.tituloEvento || 'tu presentación';
    const lugar = reserva?.nombreLugar || 'El local';

    const alert = await this.alertCtrl.create({
      header: '¡Reserva Confirmada! 🎉',
      // ¡Mira, sin HTML ni IonicSafeString! Solo texto y \n\n para los espacios
      message: `¡${lugar} ha confirmado tu reserva para ${titulo}!\n\nPor favor, se recomienda actuar bajo las reglas del local y ser muy puntual, respetando la fecha y hora acordadas para la reserva.\n\n💡 Recuerda: Mientras mejor sea tu trato y desempeño, mantendrás una buena calificación como usuario dentro de Jawy.`,
      cssClass: 'jawy-success-alert',
      backdropDismiss: false, 
      buttons: [
        {
          text: '¡Entendido!',
          role: 'confirm',
          handler: () => {
            this.apagarNotificacion(reserva.id);
            setTimeout(() => { this.alertaMostrada = false; }, 3000);
          }
        }
      ]
    });

    await alert.present();
  }
  async apagarNotificacion(idReserva: string) {
    try {
      await this.db.updateFireStoreDocument('performances', idReserva, {
        notificacionArtistaVista: true
      });
      console.log('✅ Notificación marcada como vista en Firebase');
    } catch (error) {
      console.error('❌ Error al apagar notificación:', error);
    }
  }
}