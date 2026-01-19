import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles-musicales',
  templateUrl: './detalles-musicales.page.html',
  styleUrls: ['./detalles-musicales.page.scss'],
})
export class DetallesMusicalesPage implements OnInit {

  rolEspecifico: string = '';

  instrumentos = [
    { nombre: 'Guitarra', isChecked: false },
    { nombre: 'Batería', isChecked: false },
    { nombre: 'Bajo', isChecked: false },
    { nombre: 'Teclado', isChecked: false },
    { nombre: 'Violín', isChecked: false }
  ];

  generos = [
    { nombre: 'Rock clásico', isChecked: false },
    { nombre: 'Folklore boliviano', isChecked: false },
    { nombre: 'Electro/Techno', isChecked: false },
    { nombre: 'Cumbia', isChecked: false },
    { nombre: 'Pop', isChecked: false },
    { nombre: 'Metal', isChecked: false },
    { nombre: 'Jazz', isChecked: false },
    { nombre: 'Rap', isChecked: false },
    { nombre: 'Trap', isChecked: false },
    { nombre: 'Música contemporánea', isChecked: false },
    { nombre: 'Otros', isChecked: false }
  ];

  constructor(private router: Router) { }

  ngOnInit() { }

  siguiente() {
    // Filtramos las selecciones del músico
    const seleccionInstrumentos = this.instrumentos.filter(i => i.isChecked).map(i => i.nombre);
    const seleccionGeneros = this.generos.filter(g => g.isChecked).map(g => g.nombre);

    const nuevosDatos = {
      tipoArtista: this.rolEspecifico,
      instrumentos: seleccionInstrumentos,
      generos: seleccionGeneros
    };

    // Recuperamos y unimos la información acumulada
    const datosPrevios = JSON.parse(localStorage.getItem('temp_registro') || '{}');
    const registroTotal = { ...datosPrevios, ...nuevosDatos };

    localStorage.setItem('temp_registro', JSON.stringify(registroTotal));
    console.log('Datos acumulados hasta Paso 4:', registroTotal);

    // NAVEGACIÓN AL PASO 5 (Perfil Artístico)
    this.router.navigate(['/perfil-artistico']);
  }
}