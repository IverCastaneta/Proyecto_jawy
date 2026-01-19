import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; //

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(
    private authService: AuthService, // Inyectamos tu servicio de Firebase
    private router: Router             // Para navegar entre páginas
  ) { }

  ngOnInit() {
    // Aquí podrías verificar si el usuario ya está logueado para mandarlo directo al Home
  }

  // Función vinculada al botón "Inicia sesión con Google"
  async loginGoogle() {
    const user = await this.authService.loginWithGoogle();
    
    if (user) {
      console.log('¡Bienvenido a Jawy!', user.displayName);
      // Una vez que Firebase confirma la identidad, navegamos a la pantalla principal
      this.router.navigate(['/home']); 
    } else {
      // Opcional: Aquí podrías mostrar una alerta si el login falla
      console.log('El usuario canceló el login o hubo un error.');
    }
  }

}