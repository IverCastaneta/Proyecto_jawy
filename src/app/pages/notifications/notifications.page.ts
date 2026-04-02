import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notificaciones = [
    {
      id: '1',
      tipo: 'confirmado',
      titulo: '¡Reserva Confirmada!',
      mensaje: 'El Bote ha confirmado tu presentación para el 22 de abril.',
      fecha: 'Hace 2 horas',
      leido: false,
      foto: 'assets/default-venue.jpg'
    },
    {
      id: '2',
      tipo: 'pendiente',
      titulo: 'Nueva Solicitud',
      mensaje: 'S3BA quiere tocar en tu espacio. Revisa su propuesta.',
      fecha: 'Hace 5 horas',
      leido: false,
      foto: 'assets/default-avatar.png'
    },
    {
      id: '3',
      tipo: 'rechazado',
      titulo: 'Reserva Declinada',
      mensaje: 'Lamentablemente, Malegria Bar no tiene fechas disponibles.',
      fecha: 'Ayer',
      leido: true,
      foto: 'assets/default-venue.jpg'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  marcarComoLeida(notificacion: any) {
    notificacion.leido = true;
  }
}