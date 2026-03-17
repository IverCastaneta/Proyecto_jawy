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

  // --- NUEVAS VARIABLES PARA LOS CHIPS ---
  categoriaSeleccionada: string = 'Todos';
  // Categorías estáticas por ahora (las ajustaremos si las traes de DB)
  categorias: string[] = ['Pub', 'Cafetería', 'Centro Cultural', 'Teatro', 'Bar', 'Restaurante'];

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
    });
  }

  loadLugares() {
    this.db.fetchFirestoreCollection('lugares').subscribe(res => {
      this.lugares = res;
      this.lugaresFiltered = []; 
    });
  }

  activarBusqueda() {
    this.isSearching = true;
  }

  cerrarBusqueda() {
    this.isSearching = false;
    this.busqueda = '';
    this.categoriaSeleccionada = 'Todos'; // Resetear el chip al cerrar
    this.lugaresFiltered = [];
  }

  // --- NUEVA FUNCIÓN PARA LOS CHIPS ---
  seleccionarCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
    this.filtrarResultados();
  }

  // --- SE ACTUALIZÓ PARA LLAMAR AL FILTRO MAESTRO ---
  ejecutarBusqueda(event: any) {
    this.busqueda = event.detail.value;
    this.filtrarResultados();
  }

  // --- EL NUEVO "CEREBRO" DE LA BÚSQUEDA ---
  filtrarResultados() {
    const term = this.busqueda.toLowerCase().trim();

    // Si no hay nada escrito Y estamos en "Todos", no mostramos resultados
    if (!term && this.categoriaSeleccionada === 'Todos') {
      this.lugaresFiltered = [];
      return;
    }

    // Filtramos la lista completa
    this.lugaresFiltered = this.lugares.filter(l => {
      
      // 1. Verificamos si coincide con el texto (si es que el usuario escribió algo)
      let coincideTexto = true;
      if (term) {
        coincideTexto = (l.nombre && l.nombre.toLowerCase().includes(term)) || 
                        (l.tipo && l.tipo.toLowerCase().includes(term)) ||
                        (l.direccion && l.direccion.toLowerCase().includes(term));
      }

      // 2. Verificamos si coincide con el chip de categoría seleccionado
      let coincideCategoria = true;
      if (this.categoriaSeleccionada !== 'Todos') {
        // Asumo que en tu Firebase la categoría se guarda en la propiedad "tipo"
        // Si se llama de otra forma, cambia l.tipo por l.categoria (o como lo tengas en DB)
        coincideCategoria = l.tipo === this.categoriaSeleccionada;
      }

      // Retornamos true SOLO si cumple con ambas condiciones (texto + categoría)
      return coincideTexto && coincideCategoria;
    });
  }
}