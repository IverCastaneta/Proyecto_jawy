import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  // DECLARACIÓN DE PROPIEDADES (Esto soluciona los errores TS2339)
  usuario: any; 
  miLugar: any; 
  reservas: any[] = []; 

  constructor(
    public auth: AuthService,
    public db: DatabaseService
  ) {}

  ngOnInit() {
    // Sincronizamos 'usuario' con el perfil del AuthService
    this.usuario = this.auth.profile;

    if (this.usuario) {
      this.cargarDatosSegunRol();
    } else {
      // Pequeño retraso por si el perfil aún se está recuperando del Storage
      setTimeout(() => {
        this.usuario = this.auth.profile;
        if (this.usuario) this.cargarDatosSegunRol();
      }, 500);
    }
  }

  cargarDatosSegunRol() {
    if (this.usuario.rol === 'dueno') {
      // Buscamos en la colección 'lugares' donde 'duenoId' coincida con el usuario
      this.db.getCollectionByCustomparam('lugares', 'duenoId', this.usuario.id)
        .subscribe((res: any) => {
          // Si el dueño tiene un lugar, tomamos el primero
          if (res && res.length > 0) {
            this.miLugar = res[0];
          }
        });
    } else {
      // Si es músico, cargamos sus reservas (lugares visitados)
      this.cargarReservas();
    }
  }

  cargarReservas() {
    const userId = this.usuario?.id;
    if (!userId) return;

    this.db.getDocumentById('users', userId).subscribe((userData: any) => {
      const idsReservas = userData?.reserva || [];
      this.reservas = [];
      
      idsReservas.forEach((lugarId: string) => {
        this.db.getDocumentById('lugares', lugarId).subscribe((lugarData: any) => {
          if (lugarData) this.reservas.push(lugarData);
        });
      });
    });
  }
}