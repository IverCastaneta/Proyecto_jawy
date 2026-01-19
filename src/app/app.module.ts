import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// --- SERVICIOS Y COMUNICACIÓN ---
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// --- CONFIGURACIÓN DE FIREBASE (VERSION COMPAT) ---
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

@NgModule({
  declarations: [AppComponent],
  // Permite el uso de componentes externos como Swiper para sliders musicales
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  imports: [
    BrowserModule,
    // Configuración global de la interfaz de Ionic
    IonicModule.forRoot({
      mode: 'ios', // Forzamos estilo iOS para una estética más limpia en Jawy
      rippleEffect: true
    }),
    AppRoutingModule,
    
    // Módulos para formularios (Registro y Login manual)
    ReactiveFormsModule,
    FormsModule,
    
    // Módulo para conectar con APIs externas si fuera necesario
    HttpClientModule,
    
    // INICIALIZACIÓN DE FIREBASE
    // Usa las credenciales que configuramos en environment.ts
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,      // Para el login con Google y correo
    AngularFirestoreModule,     // Para la base de datos de músicos y eventos
    AngularFireStorageModule,    // Para subir fotos de perfiles o posters de eventos
    
    RouterModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }