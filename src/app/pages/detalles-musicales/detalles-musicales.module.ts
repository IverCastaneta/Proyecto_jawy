import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesMusicalesPageRoutingModule } from './detalles-musicales-routing.module';

import { DetallesMusicalesPage } from './detalles-musicales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, // << Y aquí
    IonicModule,
    DetallesMusicalesPageRoutingModule
  ],
  declarations: [DetallesMusicalesPage]
})
export class DetallesMusicalesPageModule {}
