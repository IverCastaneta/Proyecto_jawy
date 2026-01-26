import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular'; // Correcto
import { ReservationModalComponent } from 'src/app/components/reservation-modal/reservation-modal.component';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {

  idPerfil: any;      
  user: any;          
  lugaresDelDueno: any[] = []; 
  
  constructor(
    public db: DatabaseService,
    public auth: AuthService, 
    public activatedRoute: ActivatedRoute,
    public modalCtrl: ModalController // 1. ¡IMPORTANTE! Debes inyectarlo aquí para poder usarlo
  ) {
    // El constructor solo debe capturar el ID
    this.idPerfil = this.activatedRoute.snapshot.paramMap.get('uid');
  }

  ngOnInit() {
    if (this.idPerfil) {
      this.cargarPerfil();
    }
  }

  cargarPerfil() {
    this.db.getDocumentById('users', this.idPerfil).subscribe((res: any) => {
      this.user = res;
      if (this.user?.rol === 'dueno') {
        this.db.getCollectionByCustomparam('lugares', 'duenoId', this.idPerfil)
          .subscribe((lugares: any) => {
            this.lugaresDelDueno = lugares;
          });
      }
    });
  }

  // 2. FUNCIÓN CORREGIDA (Viviendo fuera del constructor)
  async solicitarPerformance(lugar: any) {
    const musicoVisitante = this.auth.profile; 

    // Solo permitimos abrir el modal si el que visita es un músico
    if (musicoVisitante && musicoVisitante.rol === 'musico') {
      console.log(`El músico ${musicoVisitante.nombreArtistico} quiere tocar en ${lugar.nombreLugar}`);
      
      const modal = await this.modalCtrl.create({
        component: ReservationModalComponent,
        componentProps: { lugar: lugar } // Pasamos los datos del local al modal
      });

      await modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === 'confirm') {
        console.log('Reserva enviada con éxito en Jawy');
      }
    } else {
      console.log('Solo los músicos pueden solicitar performances.');
    }
  }
}