import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.scss'],
})
export class ReservationModalComponent implements OnInit {
  @Input() lugar: any; // Recibe el lugar desde la página anterior
  fecha: string = '';
  mensaje: string = '';
  enviado: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private db: DatabaseService,
    private auth: AuthService
  ) { }

  ngOnInit() { console.log('Lugar a reservar:', this.lugar); }

  dismissModal() { this.modalCtrl.dismiss(); }

  async confirmarReserva() {
    const musico = this.auth.profile;

  if (!musico) {
    console.error('Error: No se encontró el perfil del músico logueado.');
    // Opcional: Mostrar una alerta al usuario
    return; 
  }

  // 2. Validamos que el lugar haya sido recibido
  if (!this.lugar) {
    console.error('Error: No se recibieron los datos del lugar en el modal.');
    return;
  }

  const solicitud = {
    // Usamos ?. para mayor seguridad si no se validara arriba
    idMusico: musico?.id, 
    nombreMusico: musico?.nombreArtistico || musico?.nombre,
    idLugar: this.lugar?.id,
    nombreLugar: this.lugar?.nombre,
    idDueno: this.lugar?.duenoId || '',
    fechaPerformance: this.fecha,
    mensaje: this.mensaje,
    estado: 'pendiente',
    fechaSolicitud: new Date()
  };

  try {
    await this.db.addDocument('performances', solicitud);
    this.enviado = true;
  } catch (error) {
    console.error('Error al guardar la solicitud:', error);
  }
}
}