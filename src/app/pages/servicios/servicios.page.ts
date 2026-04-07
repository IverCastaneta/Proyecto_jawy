import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {
  isSearching: boolean = false;
  hayNotificaciones: boolean = true; 
  busqueda: string = '';
  categoriaSeleccionada: string = 'Todos';
  

  categorias: string[] = ['Productores', 'Cantantes', 'Músicos de Sesión', 'Mezcla'];
 listaServicios = [
    {
      id: 1,
      imagen: 'https://i.scdn.co/image/ab67616100005174ad7d00a55a3f5a33d4eef3c3', // Foto de prueba 1
      titulo: 'Banda de Rock-indie, Beat-maker',
      nombre: 'Red Cinnamon',
      ubicacion: 'La Paz',
      rating: 5,
      reviews: 1115,
      descripcion: 'Voz principal para tus tracks. He trabajado en decenas de proyectos con millones de streams.',
      creditos: ['Netflix', 'Ultra Records', 'Warner Bros']
    },
    {
      id: 2,
      imagen: 'https://picsum.photos/id/177/600/400', // Foto de prueba 2
      titulo: 'Productor Musical & Beatmaker',
      nombre: 'Sebastián C.',
      ubicacion: 'Cochabamba',
      rating: 5,
      reviews: 319,
      descripcion: 'Especialista en ritmos urbanos, trap y reggaetón. Llevo tus maquetas al nivel de la radio.',
      creditos: ['Sony Music', 'Artistas Independientes']
    },
    {
      id: 3,
      imagen: 'https://picsum.photos/id/338/600/400', // Foto de prueba 3
      titulo: 'Guitarrista de Sesión (Rock/Indie)',
      nombre: 'Leo Arana',
      ubicacion: 'Santa Cruz',
      rating: 4,
      reviews: 92,
      descripcion: 'Grabo guitarras acústicas y eléctricas con calidad de estudio. Solos rápidos y ritmos pesados.',
      creditos: ['Bandas Locales', 'Spotify Indie Mix']
    },
    {
      id: 4,
      imagen: 'https://picsum.photos/id/349/600/400', // Foto de prueba 4
      titulo: 'Ingeniero de Mezcla y Máster',
      nombre: 'Andrea V.',
      ubicacion: 'La Paz',
      rating: 5,
      reviews: 697,
      descripcion: 'Más de 10 años puliendo canciones para que suenen gigantes en cualquier altavoz.',
      creditos: ['Universal Music', 'Radio Hit']
    }
  ];

  serviciosFiltrados: any[] = [];
  estrellas = [1, 2, 3, 4, 5];

  constructor() { }

  ngOnInit() {
    this.serviciosFiltrados = [...this.listaServicios];
  }

  activarBusqueda() { 
    this.isSearching = true; 
  }
  
  cerrarBusqueda() { 
    this.isSearching = false; 
    this.busqueda = '';
    this.categoriaSeleccionada = 'Todos';
    this.serviciosFiltrados = [...this.listaServicios];
  }

  seleccionarCategoria(cat: string) {
    this.categoriaSeleccionada = cat;
    this.filtrarServicios();
  }

  ejecutarBusqueda(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.filtrarServicios();
  }

  filtrarServicios() {
    this.serviciosFiltrados = this.listaServicios.filter(srv => {
      const pasaBusqueda = srv.titulo.toLowerCase().includes(this.busqueda) || 
                           srv.nombre.toLowerCase().includes(this.busqueda);
      
      const pasaCategoria = this.categoriaSeleccionada === 'Todos' ? true : true; 
      
      return pasaBusqueda && pasaCategoria;
    });
  }
}