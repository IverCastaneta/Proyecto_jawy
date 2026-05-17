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
  
  categorias: string[] = ['Todos', 'Productores', 'Cantantes', 'Músicos de Sesión', 'Mezcla'];

  listaServicios = [
    {
      id: 1,
      imagen: 'https://i.scdn.co/image/ab67616100005174ad7d00a55a3f5a33d4eef3c3',
      titulo: 'Banda de Rock-indie, Voz, Batería, Guitarras y Bajo',
      nombre: 'Red Cinnamon',
      categoria: 'Productores',
      rating: 5,
      reviews: 1115,
      descripcion: 'Hacemos que tu rock suene con toda la garra. Grabamos desde la "Hoyada" para que tu música retumbe en todo el país con ese toque indie que pega fuerte.',
      creditos: ['Discolandia', 'Stereo 97', 'Luz de América']
    },
    {
      id: 2,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEJVqfC5tAQ5s_z7yXlqwaMEUQAbbO0HRQ7w&s', 
      titulo: 'Canta autor independiente & Beatmaker',
      nombre: 'Ale Velvet',
      categoria: 'Cantantes',
      rating: 5,
      reviews: 319,
      descripcion: 'Tus beats con puro sabor paceño. Meto mano en tus pistas de trap y reggaetón para que suenen de exportación, directo para romperla en los boliches.',
      creditos: ['Histeria Music', 'Radio Disney Bolivia', 'Líder 97']
    },
    {
      id: 3,
      imagen: 'https://www.eldiario.net/noticias/2015/2015_12/nt151227/f_2015-12-27_94.jpg', 
      titulo: 'Grupo de Cumbia, Batería, Teclado, Percusión y Voz',
      nombre: 'Mala Kumbala',
      categoria: 'Músicos de Sesión',
      rating: 4,
      reviews: 92,
      descripcion: '¡Llegó la sabrosura! Ponemos toda la fuerza de la cumbia a tu grabación. Desde los teclados hasta la percusión, hacemos que hasta el más "khari" se ponga a bailar.',
      creditos: ['Pro Audio', 'Rock & Pop Bolivia', 'Sonido Master']
    },
    {
      id: 4,
      imagen: 'https://hemeroteca.larazon.bo/wp-content/uploads/2025/11/WhatsApp-Image-2021-09-24-at-09.42.38-2.jpeg', 
      titulo: 'Escritora y Cantante de Sesión',
      nombre: 'Nia Cole',
      categoria: 'Cantantes',
      rating: 5,
      reviews: 697,
      descripcion: 'Compositora de corazón. Te ayudo a escribir esos temazos que llegan al alma y los grabo con una voz que va a dejar helado a cualquiera. Calidad para sonar en todas las radios.',
      creditos: ['Radio Illimani', 'BTV', 'El Deber Radio']
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
      
      const pasaCategoria = this.categoriaSeleccionada === 'Todos' 
                            ? true 
                            : srv.categoria === this.categoriaSeleccionada;
      
      return pasaBusqueda && pasaCategoria;
    });
  }
}