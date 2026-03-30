import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccion-rol',
  templateUrl: './seleccion-rol.page.html',
  styleUrls: ['./seleccion-rol.page.scss'],
})
export class SeleccionRolPage implements OnInit {

  rolSeleccionado: string | null = null;

 
  roles = [
    { id: 'musico', nombre: 'Músico', imagenUrl: 'assets/img/roles/musico.svg' },
    { id: 'banda', nombre: 'Banda', imagenUrl: 'assets/img/roles/banda.svg' },
    { id: 'dueno', nombre: 'Dueño de lugar', imagenUrl: 'assets/img/roles/dueno_lugar.svg' },
    { id: 'productor', nombre: 'Productor', imagenUrl: 'assets/img/roles/productor.svg' }
  ];

  constructor(private router: Router) { }

  ngOnInit() { }

  seleccionar(id: string) {
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