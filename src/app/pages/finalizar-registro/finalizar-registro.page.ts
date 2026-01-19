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
  ) {}

  async completarRegistro() {
  const storedUser = localStorage.getItem('user');
  const tempRegistro = localStorage.getItem('temp_registro');

  if (storedUser && tempRegistro) {
    const user = JSON.parse(storedUser);
    const datosFinales = JSON.parse(tempRegistro);

    const perfilParaFirebase = {
      ...datosFinales,
      perfilCompleto: true, // Crucial para la lógica de redirección
      fechaRegistroFinal: new Date()
    };

    try {
      // Actualizamos el documento en Firestore
      await this.firestore.collection('users').doc(user.uid).update(perfilParaFirebase);
      
      // Limpiamos los datos temporales del teléfono
      localStorage.removeItem('temp_registro');
      
      // Enviamos al músico al Home de Jawy
      this.router.navigateByUrl('/home');
    } catch (error) {
      console.error("Error al guardar en Firestore:", error);
    }
  }
}
}