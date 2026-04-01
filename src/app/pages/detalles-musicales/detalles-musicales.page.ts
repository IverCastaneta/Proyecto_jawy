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
    { nombre: 'Voz / Cantante', isChecked: false },
    { nombre: 'Guitarra Eléctrica', isChecked: false },
    { nombre: 'Guitarra Acústica', isChecked: false },
    { nombre: 'Bajo Eléctrico', isChecked: false },
    { nombre: 'Batería', isChecked: false },
    { nombre: 'Piano / Teclado', isChecked: false },
    { nombre: 'Sintetizador / DJ Controller', isChecked: false },
    { nombre: 'Percusión (Congas, Cajón, etc.)', isChecked: false },
    { nombre: 'Saxofón', isChecked: false },
    { nombre: 'Trompeta', isChecked: false },
    { nombre: 'Violín', isChecked: false },
    { nombre: 'Flauta', isChecked: false },
    { nombre: 'Charango', isChecked: false },
    { nombre: 'Zampoña', isChecked: false },
    { nombre: 'Quena', isChecked: false },
    { nombre: 'Acordeón', isChecked: false },
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
    const seleccionInstrumentos = this.instrumentos.filter(i => i.isChecked).map(i => i.nombre);
    const seleccionGeneros = this.generos.filter(g => g.isChecked).map(g => g.nombre);

    const nuevosDatos = {
      tipoArtista: this.rolEspecifico,
      instrumentos: seleccionInstrumentos,
      generos: seleccionGeneros
    };

    const datosPrevios = JSON.parse(localStorage.getItem('temp_registro') || '{}');
    const registroTotal = { ...datosPrevios, ...nuevosDatos };

    localStorage.setItem('temp_registro', JSON.stringify(registroTotal));
    console.log(registroTotal);

    this.router.navigate(['/finalizar-registro']);
  }
}