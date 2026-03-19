import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccion-rol',
  templateUrl: './seleccion-rol.page.html',
  styleUrls: ['./seleccion-rol.page.scss'],
})
export class SeleccionRolPage implements OnInit {

  rolSeleccionado: number | null = null;

  roles = [
    { id: 1, nombre: 'Músico', imagenUrl: 'assets/img/roles/musico.svg' },
    { id: 2, nombre: 'Banda', imagenUrl: 'assets/img/roles/banda.svg' },
    { id: 3, nombre: 'Dueño de lugar', imagenUrl: 'assets/img/roles/dueno_lugar.svg' },
    { id: 4, nombre: 'Productor', imagenUrl: 'assets/img/roles/productor.svg' },
  ];

  constructor(private router: Router) { }

  ngOnInit() { }

  seleccionar(id: number) {
    this.rolSeleccionado = id;
  }

  siguiente() {
    if (this.rolSeleccionado !== null) {
      const registroInicial = {
        rol: this.rolSeleccionado
      };

      localStorage.setItem('temp_registro', JSON.stringify(registroInicial));
      this.router.navigate(['/informacion-personal']);
    }
  }

}