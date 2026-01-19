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

    // Función vinculada al botón "Inicia sesión con Google"
  
    // LLAMADA ÚNICA: 
    // El AuthService se encarga de todo: abrir el popup, 
    // verificar el perfil en Firestore y decidir a qué página navegar.
    try {
      await this.authService.loginWithGoogle();
    } catch (error) {
      console.error('Error durante el proceso de login:', error);
    }
  

  }


}