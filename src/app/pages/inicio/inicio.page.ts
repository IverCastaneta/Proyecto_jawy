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
      await this.authService.loginWithGoogle();
      this.router.navigate(['/informacion-personal']);
    } catch (error) {
      console.error(error);
    }
  }
}