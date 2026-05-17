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
      const result: any = await this.authService.loginWithGoogle();

      if (!result) {
        console.log("DEBUG: No hay resultado de Google");
        return;
      }

      console.log("DEBUG: Datos del usuario:", result);

      if (result.isNewUser) {
        console.log("DEBUG: Redirigiendo a Registro");
        this.router.navigate(['/informacion-personal']);
      } else {
        console.log("DEBUG: Intentando ir a Profile...");
        this.router.navigate(['/tabs/profile']).then(success => {
          if (!success) console.error("DEBUG: ¡La ruta /tabs/profile falló!");
        });
      }
      
    } catch (error) {
      console.error("DEBUG Error:", error);
    }
  }
}