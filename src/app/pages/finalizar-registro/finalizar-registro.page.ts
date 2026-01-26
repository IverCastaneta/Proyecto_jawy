import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-finalizar-registro',
  templateUrl: './finalizar-registro.page.html',
  styleUrls: ['./finalizar-registro.page.scss'],
})
export class FinalizarRegistroPage {

  constructor(
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  async completarRegistro() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const temp = JSON.parse(localStorage.getItem('temp_registro') || '{}');

    // 1. Datos del Usuario (Comunes)
    const datosUsuario = {
      id: user.uid,
      nombreReal: temp.nombreReal || '',
      nombreArtistico: temp.nombreArtistico || temp.nombreLugar || 'Nuevo Usuario',
      email: temp.email || user.email,
      telefono: temp.telefono || '',
      rol: temp.rol, // 'musico' o 'dueno'
      biografia: temp.biografia || temp.descripcion || '',
      fotoPerfil: temp.fotoPerfil || temp.fotoLugar || '',
      perfilCompleto: true
    };

    try {
      // Guardar en colección Users
      await this.firestore.collection('users').doc(user.uid).set(datosUsuario);

      // 2. Si es Dueño, crear documento separado en 'lugares'
      if (temp.rol === 'dueno') {
        const lugarId = this.firestore.createId();
        const datosLugar = {
          id: lugarId,
          duenoId: user.uid, // Referencia al dueño
          nombre: temp.nombreLugar,
          direccion: temp.direccion,
          descripcion: temp.descripcion,
          capacidad: temp.capacidadLugar,
          equipamiento: temp.equipamientoLugar || [],
          foto: temp.fotoLugar || ''
        };
        await this.firestore.collection('lugares').doc(lugarId).set(datosLugar);
      }

      localStorage.removeItem('temp_registro');
      this.router.navigateByUrl('/profile');
    } catch (e) { console.error(e); }
  }
}