import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile-gestion',
  templateUrl: './profile-gestion.component.html',
  styleUrls: ['./profile-gestion.component.scss'],
})
export class ProfileGestionComponent {
  @Input() solicitudes: any[] = [];
  @Input() usuario: any;
  @Input() cargando: boolean = false;


  @Output() rechazar = new EventEmitter<any>();
  
  @Output() aceptar = new EventEmitter<{id: string, estado: 'confirmado' | 'rechazado'}>();
  
  @Output() contactar = new EventEmitter<any>();

  onRechazar(solicitud: any) { this.rechazar.emit(solicitud); }
  
  onAceptar(id: string, estado: 'confirmado' | 'rechazado') { 
    this.aceptar.emit({ id, estado }); 
  }
  
  onContactar(solicitud: any) { this.contactar.emit(solicitud); }
}