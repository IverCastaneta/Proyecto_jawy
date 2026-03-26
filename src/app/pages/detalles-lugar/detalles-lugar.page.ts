import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles-lugar',
  templateUrl: './detalles-lugar.page.html',
  styleUrls: ['./detalles-lugar.page.scss'],
})
export class DetallesLugarPage implements OnInit {

  capacidad: string = '';
  precioCover: number | null = null;
  
  nuevaRegla: string = '';
  reglasLista: string[] = [];

  equipamiento = [
    { nombre: 'Amplificadores', isChecked: false },
    { nombre: 'Micrófonos', isChecked: false },
    { nombre: 'Consola de sonido', isChecked: false },
    { nombre: 'Monitores', isChecked: false },
    { nombre: 'Batería', isChecked: false },
    { nombre: 'Iluminación', isChecked: false },
    { nombre: 'Proyector', isChecked: false },
    { nombre: 'DJ Booth', isChecked: false },
    { nombre: 'Sillas / mesas', isChecked: false },
    { nombre: 'Mezcladora DJ / Pads', isChecked: false },
    { nombre: 'Otros', isChecked: false }
  ];

  constructor(private router: Router) { }

  ngOnInit() {}

  agregarRegla() {
    if (this.nuevaRegla.trim().length > 0) {
      this.reglasLista.push(this.nuevaRegla.trim());
      this.nuevaRegla = ''; 
    }
  }

  eliminarRegla(index: number) {
    this.reglasLista.splice(index, 1);
  }

  siguiente() {
    const seleccionEquipamiento = this.equipamiento
      .filter(e => e.isChecked)
      .map(e => e.nombre);

    const nuevosDatos = {
      capacidadLugar: this.capacidad,
      precioCover: this.precioCover,
      reglasLocal: this.reglasLista,
      equipamientoLugar: seleccionEquipamiento
    };

    const datosPrevios = JSON.parse(localStorage.getItem('temp_registro') || '{}');
    const registroTotal = { ...datosPrevios, ...nuevosDatos };
    
    localStorage.setItem('temp_registro', JSON.stringify(registroTotal));
    
    this.router.navigate(['/perfil-artistico']); 
  }
}