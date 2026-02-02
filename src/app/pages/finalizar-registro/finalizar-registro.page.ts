import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AnimationController } from '@ionic/angular'; // <--- IMPORTANTE PARA LA ANIMACIÓN

@Component({
  selector: 'app-finalizar-registro',
  templateUrl: './finalizar-registro.page.html',
  styleUrls: ['./finalizar-registro.page.scss'],
})
export class FinalizarRegistroPage implements AfterViewInit {
  // 1. Referencia al icono del HTML
  @ViewChild('successIcon', { read: ElementRef }) successIcon!: ElementRef;

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private animationCtrl: AnimationController // <--- INYECTAMOS EL CONTROLADOR
  ) { }

  // 2. Se ejecuta cuando la vista ya cargó
  ngAfterViewInit() {
    this.animarIcono();
  }

  animarIcono() {
    // Creamos una animación de rebote (Pop-in)
    const animation = this.animationCtrl.create()
      .addElement(this.successIcon.nativeElement)
      .duration(1000) // 1 segundo de duración
      .iterations(1)
      .easing('cubic-bezier(0.175, 0.885, 0.32, 1.275)') // Curva de rebote profesional
      .fromTo('transform', 'scale(0)', 'scale(1)') // De invisible a tamaño real
      .fromTo('opacity', '0', '1');

    animation.play();
  }

  async completarRegistro() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const temp = JSON.parse(localStorage.getItem('temp_registro') || '{}');

    const datosUsuario = {
      id: user.uid,
      nombreReal: temp.nombreReal || '',
      nombreArtistico: temp.nombreArtistico || temp.nombreLugar || 'Nuevo Usuario',
      email: temp.email || user.email,
      telefono: temp.telefono || '',
      rol: temp.rol,
      biografia: temp.biografia || temp.descripcion || '',
      fotoPerfil: temp.fotoPerfil || temp.fotoLugar || '',
      perfilCompleto: true
    };

    try {
      await this.firestore.collection('users').doc(user.uid).set(datosUsuario);

      if (temp.rol === 'dueno') {
        const lugarId = this.firestore.createId();
        const datosLugar = {
          id: lugarId,
          duenoId: user.uid,
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
    } catch (e) { 
      console.error('Error al guardar en Firebase:', e); 
    }
  }
}