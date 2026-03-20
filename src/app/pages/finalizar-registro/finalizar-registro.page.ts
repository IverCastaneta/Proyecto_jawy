import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-finalizar-registro',
  templateUrl: './finalizar-registro.page.html',
  styleUrls: ['./finalizar-registro.page.scss'],
})
export class FinalizarRegistroPage implements AfterViewInit {
  @ViewChild('successIcon', { read: ElementRef }) successIcon!: ElementRef;

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private animationCtrl: AnimationController 
  ) { }

  ngAfterViewInit() {
    this.animarIcono();
  }

  animarIcono() {
    const animation = this.animationCtrl.create()
      .addElement(this.successIcon.nativeElement)
      .duration(1000)
      .iterations(1)
      .easing('cubic-bezier(0.175, 0.885, 0.32, 1.275)')
      .fromTo('transform', 'scale(0)', 'scale(1)')
      .fromTo('opacity', '0', '1');

    animation.play();
  }

  async completarRegistro() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const temp = JSON.parse(localStorage.getItem('temp_registro') || '{}');

    const datosUsuario = {
      ...temp, 
      id: user.uid,
      email: temp.email || user.email,
      perfilCompleto: true
    };

    try {
      await this.firestore.collection('users').doc(user.uid).set(datosUsuario, { merge: true });

      if (temp.rol === 'dueno' || temp.rol === 'dueño') {
        const lugarId = this.firestore.createId();
        const datosLugar = {
          id: lugarId,
          duenoId: user.uid,
          nombre: temp.nombreLugar || '',
          direccion: temp.direccion || '',
          descripcion: temp.descripcion || '',
          capacidad: temp.capacidadLugar || '',
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