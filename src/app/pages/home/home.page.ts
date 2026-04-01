import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  musicos: any[] = [];
  lugares: any[] = [];
  lugaresFiltered: any[] = [];
  
  isSearching: boolean = false;
  busqueda: string = '';

  categoriaSeleccionada: string = 'Todos';
  categorias: string[] = ['Pub', 'Cafetería', 'Centro Cultural', 'Teatro', 'Bar', 'Restaurante'];

  cargandoMusicos: boolean = true;
  cargandoLugares: boolean = true;

  constructor(
    public db: DatabaseService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.loadUsers();
    this.loadLugares();
  }

  loadUsers() {
    this.db.fetchFirestoreCollection('users').subscribe(res => {
      this.musicos = res;
      this.cargandoMusicos = false;
    });
  }

  loadLugares() {
    this.db.fetchFirestoreCollection('lugares').subscribe(res => {
      this.lugares = res;
      this.cargandoLugares = false;
      if (this.isSearching) {
        this.filtrarResultados();
      }
    });
  }

  activarBusqueda() {
    this.isSearching = true;
    this.filtrarResultados();
  }

  cerrarBusqueda() {
    this.isSearching = false;
    this.busqueda = '';
    this.categoriaSeleccionada = 'Todos';
    this.lugaresFiltered = [];
  }

  seleccionarCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
    this.filtrarResultados();
  }

  ejecutarBusqueda(event: any) {
    this.busqueda = event.detail.value || '';
    this.filtrarResultados();
  }

  filtrarResultados() {
    const term = this.busqueda.toLowerCase().trim();

    this.lugaresFiltered = this.lugares.filter(l => {
      let coincideTexto = true;
      if (term) {
        coincideTexto = (l.nombre && l.nombre.toLowerCase().includes(term)) || 
                        (l.tipo && l.tipo.toLowerCase().includes(term)) ||
                        (l.tipoLocal && l.tipoLocal.toLowerCase().includes(term)) ||
                        (l.direccion && l.direccion.toLowerCase().includes(term));
      }

      let coincideCategoria = true;
      if (this.categoriaSeleccionada !== 'Todos') {
        coincideCategoria = (l.tipo === this.categoriaSeleccionada) || 
                            (l.tipoLocal === this.categoriaSeleccionada);
      }

      return coincideTexto && coincideCategoria;
    });
  }

  formatearFechaEspanol(fechaString: string): string {
    if (!fechaString) return '';
    

    const fecha = new Date(fechaString + 'T00:00:00'); 
    
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();

    return `${dia} de ${mes} ${anio}`; 
  }
}