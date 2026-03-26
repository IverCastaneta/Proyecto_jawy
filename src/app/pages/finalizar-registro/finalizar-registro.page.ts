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

    // 1. SEPARAMOS LA INFORMACIÓN CON PINZAS
    // Extraemos todo lo que le pertenece al lugar...
    const {
      nombreLugar, direccion, descripcion, tipoLocal,
      capacidadLugar, precioCover, reglasLocal, equipamientoLugar, fotosLugar,
      ...datosSoloUsuario // ...y guardamos "el resto" aquí (nombre artístico, foto de perfil, rol, etc.)
    } = temp;

    // 2. ARMAMOS EL USUARIO LIMPIO
    const datosUsuario = {
      ...datosSoloUsuario, 
      id: user.uid,
      email: datosSoloUsuario.email || user.email,
      perfilCompleto: true
    };

    try {
      // 3. GUARDAMOS AL USUARIO EN SU COLECCIÓN
      await this.firestore.collection('users').doc(user.uid).set(datosUsuario, { merge: true });

      // 4. SI ES DUEÑO, GUARDAMOS SU LUGAR EN LA COLECCIÓN "lugares"
      if (temp.rol === 'dueno' || temp.rol === 'dueño') {
        const lugarId = this.firestore.createId();
        const datosLugar = {
          id: lugarId,
          duenoId: user.uid,
          nombre: nombreLugar || '',
          direccion: direccion || '',
          descripcion: descripcion || '',
          tipoLocal: tipoLocal || '',
          capacidad: capacidadLugar || '',
          precioCover: precioCover || null,
          reglas: reglasLocal || [],
          equipamiento: equipamientoLugar || [],
          fotos: fotosLugar || [] // Ahora guarda el arreglo de fotos completo para el carrusel
        };
        
        // Guardamos en la colección correcta
        await this.firestore.collection('lugares').doc(lugarId).set(datosLugar);
      }

      // 5. LIMPIEZA Y REDIRECCIÓN
      localStorage.removeItem('temp_registro');
      this.router.navigateByUrl('/profile');
      
    } catch (e) { 
      console.error('Error al guardar en Firebase:', e); 
    }
  }
}