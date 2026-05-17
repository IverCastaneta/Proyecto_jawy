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
      imagen: 'https://scontent.flpb2-2.fna.fbcdn.net/v/t51.82787-15/656294922_18262635766290534_6405322582660226517_n.webp?stp=dst-jpg_p526x296_tt6&_nc_cat=111&ccb=1-7&_nc_sid=13d280&_nc_ohc=G1RGfxjtq1sQ7kNvwGIbXux&_nc_oc=Ado4UlQUWd194HCgzvWIzdOXdJrRIkVFgNf9X1eSXwgBqru7U-P6nxUs89gGw2EuBGDXs1XteOsWjQmGbAZuw5UX&_nc_zt=23&_nc_ht=scontent.flpb2-2.fna&_nc_gid=DZqLVQ7gLj4JLQTfixaAeA&_nc_ss=7a3a8&oh=00_Af3yQyxdl74jg-_VRiXPPaljdiXWdDPe6J7vlrSVSLQfEw&oe=69DAE873', 
      titulo: 'UPSIDE DOWN',
      fecha: 'Viernes, 27 de Marzo - 21:00',
      descripcion: '. Una experiencia en vivo que te llevará fuera de la realidad, donde el sonido y la atmósfera se transforman en algo completamente distinto.',
      lineup: ['Los Vatios', 'Eco Lunar'],
      genero: 'Sinfonico',
      cover: '30 Bs.'
    },
    {
      id: 2,
      imagen: 'https://scontent.flpb3-1.fna.fbcdn.net/v/t39.30808-6/658101715_122154446756814560_5897511413530143909_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_ohc=IGzlgfH2oukQ7kNvwE6vb4k&_nc_oc=Adqy7kOeJX2aDBojvb9vRzYrBTTf-gobmZzDSjE8_UOsO9tp_YGctsvVITR3M4Fut2Q&_nc_zt=23&_nc_ht=scontent.flpb3-1.fna&_nc_gid=snIvprJp0O0-RrskEItuvA&_nc_ss=7a3a8&oh=00_Af3rF6LTo_RNywer2TsZxsNKlYivJQ0TDoM6Ly0_f1_Cog&oe=69DB24A6',
      titulo: 'Noche de Salsa',
      fecha: 'Viernes, 27 de Abril - 20:00',
      descripcion: 'Despide el sol con los mejores beats, tragos y un ambiente inigualable.',
      lineup: ['Sheqere'],
      genero: 'Salsa',
      cover: '40 Bs.'
    },
    {
      id: 3,
      imagen: 'https://scontent.flpb3-2.fna.fbcdn.net/v/t39.30808-6/661590113_926446730190373_7659455990812158629_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_ohc=OcMqJ2BguV0Q7kNvwHxtz3i&_nc_oc=Adq17ECdk_dr9b1S8zS7pRR2zQJJzfnhyEWBq7TjgTA9Elhmm7Ah8b-LwHImru2-Dd0&_nc_zt=23&_nc_ht=scontent.flpb3-2.fna&_nc_gid=3oXP9gP-3PIPm3qvYl1y_Q&_nc_ss=7a3a8&oh=00_Af0pqoqNUwrrr1TFEUmXoRs0d8hoJk4lJCtCmF2kJ9em2A&oe=69DB23F4',
      titulo: 'Santo Desmadre',
      fecha: 'Miércoles, 15 de Abril - 20:00',
      descripcion: 'Sesión desconectada ideal para disfrutar de la música en su estado más puro. Nadie se hace a los santos',
      lineup: ['Vs de Bandas y Vs de DJ'],
      genero: 'Rock Pesado - Metal',
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