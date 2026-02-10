import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-lugar',
  templateUrl: './add-lugar.page.html',
  styleUrls: ['./add-lugar.page.scss'],
})
export class AddLugarPage implements OnInit {

  lugar = {
    nombre: '',
    descripcion: '',
    precio: null,
    direccion: '',
    tipo: '',
    capacidad: '',
    whatsapp: '',
    foto: '',
    servicios: [] as string[] // Aquí se guardan los chips (Wifi, Sonido, etc.)
  };

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  // Verifica si el servicio está en el array para cambiar el color del chip
  hasService(service: string): boolean {
    return this.lugar.servicios.includes(service);
  }

  // Agrega o quita el servicio del array al hacer clic
  toggleService(service: string) {
    const index = this.lugar.servicios.indexOf(service);
    if (index > -1) {
      this.lugar.servicios.splice(index, 1);
    } else {
      this.lugar.servicios.push(service);
    }
  }

  async submitLugar() {
    if (!this.lugar.nombre || !this.lugar.precio) {
      alert('Nombre y Precio son obligatorios');
      return;
    }

    try {
      await this.authService.addLugar(this.lugar);
      console.log('Lugar guardado con éxito');
      this.router.navigate(['/perfil']); 
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  }
}