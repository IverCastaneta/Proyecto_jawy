import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // Declaramos las variables correctamente
  musicos: any[] = [];
  lugares: any[] = [];

  constructor(
    public db: DatabaseService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.loadUsers();
    this.loadLugares();
  }

 loadLugares() {
  this.db.fetchFirestoreCollection('lugares').subscribe(res => {
    this.lugares = res;
    console.log('¿Hay lugares?', this.lugares.length > 0);
    console.table(this.lugares); // Esto te mostrará una tabla linda en la consola del navegador
  });
}

  loadUsers() {
    // Cargamos todos los músicos desde la colección 'users'
    this.db.fetchFirestoreCollection('users').subscribe(res => {
      this.musicos = res; // Debe llamarse 'musicos' para que el *ngFor lo encuentre
    });
  }
}