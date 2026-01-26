import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesLugarPageRoutingModule } from './detalles-lugar-routing.module';

import { DetallesLugarPage } from './detalles-lugar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, // << Y añadirlo aquí
    IonicModule,
    DetallesLugarPageRoutingModule
  ],
  declarations: [DetallesLugarPage]
})
export class DetallesLugarPageModule {}
