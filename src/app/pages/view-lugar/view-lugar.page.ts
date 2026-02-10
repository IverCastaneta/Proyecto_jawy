import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { ModalController } from '@ionic/angular'; // 1. Importación necesaria
import { ReservationModalComponent } from 'src/app/components/reservation-modal/reservation-modal.component';

@Component({
  selector: 'app-view-lugar',
  templateUrl: './view-lugar.page.html',
  styleUrls: ['./view-lugar.page.scss'],
})
export class ViewLugarPage implements OnInit {

  id: any;
  lugar: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private db: DatabaseService,
    private modalCtrl: ModalController // 2. Inyectamos el controlador de modales
  ) { }

  ngOnInit() {
  // CAMBIO CLAVE: Cambiamos 'id' por 'idLugar' para que coincida con el routing
  this.id = this.activatedRoute.snapshot.paramMap.get('idLugar');
  
  console.log('ID capturado correctamente:', this.id);

  if (this.id) {
    this.db.getDocumentById('lugares', this.id).subscribe(res => {
      this.lugar = res;
      console.log('¡Datos cargados con éxito!', this.lugar);
    });
  }
}

  // 3. LA FUNCIÓN QUE FALTA: Esto elimina el error TS2339
  async solicitarPerformance(lugar: any) {
    const modal = await this.modalCtrl.create({
      component: ReservationModalComponent,
      componentProps: { lugar: lugar } // Le pasamos los datos del lugar al modal
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      console.log('Solicitud enviada para:', lugar.nombre);
    }
  }
  getIconForEquipment(item: string): string {
  const text = item.toLowerCase();
  if (text.includes('ampli')) return 'volume-high-outline';
  if (text.includes('bateria')) return 'musical-notes-outline';
  if (text.includes('mic')) return 'mic-outline';
  if (text.includes('luces')) return 'flashlight-outline';
  if (text.includes('wifi')) return 'wifi-outline';
  if (text.includes('consola')) return 'settings-outline';
  return 'checkmark-circle-outline'; // Icono por defecto
}
}