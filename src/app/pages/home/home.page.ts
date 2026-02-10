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
    this.lugaresFiltered = [];
  }

  ejecutarBusqueda(event: any) {
    this.busqueda = event.detail.value;
    const term = this.busqueda.toLowerCase();

    if (!term.trim()) {
      this.lugaresFiltered = [];
      return;
    }
    
    this.lugaresFiltered = this.lugares.filter(l => 
      (l.nombre && l.nombre.toLowerCase().includes(term)) || 
      (l.tipo && l.tipo.toLowerCase().includes(term)) ||
      (l.direccion && l.direccion.toLowerCase().includes(term))
    );
  }
}