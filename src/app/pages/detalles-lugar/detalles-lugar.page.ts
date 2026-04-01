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
  fechaDisponibilidad: string = new Date().toISOString();

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

  generos = [
    { nombre: 'Rock', isChecked: false },
    { nombre: 'Pop', isChecked: false },
    { nombre: 'Electrónica', isChecked: false },
    { nombre: 'Reggaeton', isChecked: false },
    { nombre: 'Urbano/Trap', isChecked: false },
    { nombre: 'Salsa', isChecked: false },
    { nombre: 'Cumbia', isChecked: false },
    { nombre: 'Bachata', isChecked: false },
    { nombre: 'Jazz', isChecked: false },
    { nombre: 'Blues', isChecked: false },
    { nombre: 'Acústico/Cantautor', isChecked: false },
    { nombre: 'Folk', isChecked: false },
    { nombre: 'Metal', isChecked: false },
    { nombre: 'Otro', isChecked: false }
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

    const seleccionGeneros = this.generos
      .filter(g => g.isChecked)
      .map(g => g.nombre);

    const nuevosDatos = {
      capacidadLugar: this.capacidad,
      precioCover: this.precioCover,
      reglasLocal: this.reglasLista,
      equipamientoLugar: seleccionEquipamiento,
      generosLugar: seleccionGeneros,
      fechaDisponibilidad: this.fechaDisponibilidad
    };

    const datosPrevios = JSON.parse(localStorage.getItem('temp_registro') || '{}');
    const registroTotal = { ...datosPrevios, ...nuevosDatos };
    
    localStorage.setItem('temp_registro', JSON.stringify(registroTotal));
    
    this.router.navigate(['/finalizar-registro']); 
  }
}