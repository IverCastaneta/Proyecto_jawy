import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { ModalController } from '@ionic/angular';
import { ReservationModalComponent } from 'src/app/components/reservation-modal/reservation-modal.component';

import { register } from 'swiper/element/bundle';
register();

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
    private modalCtrl: ModalController 
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('idLugar');
    
    console.log('ID capturado correctamente:', this.id);

    if (this.id) {
      this.db.getDocumentById('lugares', this.id).subscribe(res => {
        this.lugar = res;
        console.log('¡Datos cargados con éxito!', this.lugar);
      });
    }
  }

  async solicitarPerformance(lugar: any) {
    const modal = await this.modalCtrl.create({
      component: ReservationModalComponent,
      componentProps: { lugar: lugar }
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
    if (text.includes('bateria') || text.includes('batería')) return 'musical-notes-outline';
    if (text.includes('mic')) return 'mic-outline';
    if (text.includes('luces') || text.includes('iluminación')) return 'flashlight-outline';
    if (text.includes('wifi')) return 'wifi-outline';
    if (text.includes('consola') || text.includes('mezcladora')) return 'options-outline';
    if (text.includes('proyector')) return 'videocam-outline';
    if (text.includes('dj')) return 'disc-outline';
    if (text.includes('sillas') || text.includes('mesas')) return 'cafe-outline';
    return 'checkmark-circle-outline'; 
  }

  formatearFechaEspanol(fechaString: string): string {
    if (!fechaString) return '';
    
    // Le agregamos 'T00:00:00' para evitar que por zonas horarias te reste un día
    const fecha = new Date(fechaString + 'T00:00:00'); 
    
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();

    // Devuelve "02 de febrero 2026"
    return `${dia} de ${mes} ${anio}`; 
  }
}