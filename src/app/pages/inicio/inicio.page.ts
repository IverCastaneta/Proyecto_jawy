import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {

  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  constructor(
    private authService: AuthService, 
    private router: Router            
  ) { }

  ionViewDidEnter() {
    if (this.bgVideo && this.bgVideo.nativeElement) {
      this.bgVideo.nativeElement.muted = true;
      this.bgVideo.nativeElement.play().catch(error => console.error(error));
    }
  }

async loginGoogle() {
    try {
      // AQUÍ ESTÁ LA MAGIA: Le ponemos ': any' para que TypeScript no bloquee la compilación
      const result: any = await this.authService.loginWithGoogle();
      
      // 1. Verificamos que el resultado no sea nulo
      if (!result) {
        console.log('Login cancelado o fallido.');
        return; 
      }

      // 2. Ahora TypeScript ya no se quejará de 'isNewUser'
      if (result.isNewUser) {
        console.log('Usuario nuevo o con perfil incompleto. Redirigiendo a registro...');
        this.router.navigate(['/informacion-personal']);
      } else {
        // 3. Ya tiene cuenta y su perfil está completo
        console.log('Usuario antiguo. Bienvenido de vuelta, redirigiendo a Home...');
        this.router.navigate(['/tabs/home']); 
      }
      
    } catch (error) {
      console.error('Error durante el inicio de sesión inteligente:', error);
    }
  }
}