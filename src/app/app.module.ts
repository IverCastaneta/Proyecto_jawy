import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// --- ANIMACIONES LOTTIE ---
import { provideLottieOptions } from 'ngx-lottie'; 
import player from 'lottie-web';

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
  // Permite el uso de componentes externos como Swiper o Lottie
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  imports: [
    BrowserModule,
    // Configuración global de la interfaz de Ionic
    IonicModule.forRoot({ 
      mode: 'ios', // Estética limpia para Jawy
      rippleEffect: true 
    }),
    AppRoutingModule,
    
    // Módulos para formularios
    ReactiveFormsModule,
    FormsModule,
    
    // Módulo para conectar con APIs
    HttpClientModule,
    
    // INICIALIZACIÓN DE FIREBASE
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,      
    AngularFirestoreModule,     
    AngularFireStorageModule,    
    
    RouterModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // CONFIGURACIÓN DE LOTTIE PARA ANGULAR 18
    provideLottieOptions({ 
      player: () => player 
    }) 
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }