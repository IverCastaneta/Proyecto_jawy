import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {

  // Variables para la búsqueda y el header
  isSearching: boolean = false;
  hayNotificaciones: boolean = true; 
  busqueda: string = '';
  
  // Filtros de tiempo
  categoriaSeleccionada: string = 'Todos';
  categorias: string[] = ['Esta semana', 'Este fin de semana', 'Este mes'];

  // Mock Data de Eventos (Imágenes más verticales para simular pósters)
  listaEventos = [
    {
      id: 1,
      imagen: 'https://picsum.photos/id/452/600/800', 
      titulo: 'Noche de Rock Alternativo',
      fecha: 'Viernes, 10 de Abril - 21:00',
      descripcion: 'Una noche llena de energía y distorsión con las mejores bandas de la escena local.',
      lineup: ['Los Vatios', 'Eco Lunar'],
      genero: 'Rock / Indie',
      cover: '30 Bs.'
    },
    {
      id: 2,
      imagen: 'https://picsum.photos/id/338/600/800',
      titulo: 'Sunset Electrónico',
      fecha: 'Sábado, 11 de Abril - 16:00',
      descripcion: 'Despide el sol con los mejores beats, tragos y un ambiente inigualable.',
      lineup: ['DJ Rata', 'Valeria M. (Live Vocal)'],
      genero: 'House / EDM',
      cover: '50 Bs.'
    },
    {
      id: 3,
      imagen: 'https://picsum.photos/id/145/600/800',
      titulo: 'Acústico Íntimo',
      fecha: 'Miércoles, 15 de Abril - 20:00',
      descripcion: 'Sesión desconectada ideal para disfrutar de la música en su estado más puro.',
      lineup: ['Leo Arana', 'Sofía Paz'],
      genero: 'Acústico / Trova',
      cover: 'Gratis'
    },
    {
      id: 4,
      imagen: 'https://picsum.photos/id/349/600/800',
      titulo: 'Batalla de Gallos 2026',
      fecha: 'Sábado, 25 de Abril - 19:00',
      descripcion: 'Los mejores MCs de la ciudad se enfrentan por el título en una noche épica.',
      lineup: ['MC Trueno', 'Sombra', 'DJ Scratch'],
      genero: 'Hip Hop / Rap',
      cover: '40 Bs.'
    }
  ];

  eventosFiltrados: any[] = [];

  constructor() { }

  ngOnInit() {
    this.eventosFiltrados = [...this.listaEventos];
  }

  // --- LÓGICA DE BÚSQUEDA ---
  activarBusqueda() { this.isSearching = true; }
  
  cerrarBusqueda() { 
    this.isSearching = false; 
    this.busqueda = '';
    this.categoriaSeleccionada = 'Todos';
    this.eventosFiltrados = [...this.listaEventos];
  }

  seleccionarCategoria(cat: string) {
    this.categoriaSeleccionada = cat;
    this.filtrarEventos();
  }

  ejecutarBusqueda(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.filtrarEventos();
  }

  filtrarEventos() {
    this.eventosFiltrados = this.listaEventos.filter(evt => {
      const pasaBusqueda = evt.titulo.toLowerCase().includes(this.busqueda) || 
                           evt.genero.toLowerCase().includes(this.busqueda);
      
      // Aquí en un proyecto real filtrarías por fechas reales
      const pasaCategoria = this.categoriaSeleccionada === 'Todos' ? true : true; 
      
      return pasaBusqueda && pasaCategoria;
    });
  }
}