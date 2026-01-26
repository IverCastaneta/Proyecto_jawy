import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles-lugar',
  templateUrl: './detalles-lugar.page.html',
  styleUrls: ['./detalles-lugar.page.scss'],
})
export class DetallesLugarPage implements OnInit {

  capacidad: string = '';
  equipamiento = [
    { nombre: 'Amplificadores', isChecked: false },
    { nombre: 'Micrófonos', isChecked: false },
    { nombre: 'Consola de sonido', isChecked: false },
    { nombre: 'Monitores', isChecked: false }
  ];

  constructor(private router: Router) { }

  ngOnInit() {}

  siguiente() {
    const seleccionEquipamiento = this.equipamiento
      .filter(e => e.isChecked)
      .map(e => e.nombre);

    const nuevosDatos = {
      capacidadLugar: this.capacidad,
      equipamientoLugar: seleccionEquipamiento
    };

    const datosPrevios = JSON.parse(localStorage.getItem('temp_registro') || '{}');
    const registroTotal = { ...datosPrevios, ...nuevosDatos };
    
    localStorage.setItem('temp_registro', JSON.stringify(registroTotal));
    
    // Una vez completados los detalles del lugar, el dueño también 
    // debe pasar por la pantalla de foto y descripción de perfil.
    this.router.navigate(['/perfil-artistico']); 
  }
}