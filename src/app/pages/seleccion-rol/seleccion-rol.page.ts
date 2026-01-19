import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccion-rol',
  templateUrl: './seleccion-rol.page.html',
  styleUrls: ['./seleccion-rol.page.scss'],
})
export class SeleccionRolPage implements OnInit {

  rolSeleccionado: string = '';

  roles = [
    { id: 'musico', nombre: 'Musico' },
    { id: 'banda', nombre: 'Banda' },
    { id: 'dueno', nombre: 'Dueño de lugar' },
    { id: 'productor', nombre: 'Productor' },
    { id: 'otro', nombre: 'Otro' }
  ];

  constructor(private router: Router) { }

  ngOnInit() { }

  seleccionar(id: string) {
    this.rolSeleccionado = id;
  }

  siguiente() {
    if (this.rolSeleccionado) {
      // Guardamos como un objeto JSON inicial
      const registroInicial = {
        rol: this.rolSeleccionado
      };

      localStorage.setItem('temp_registro', JSON.stringify(registroInicial));
      this.router.navigate(['/informacion-personal']);
    }
  }

}