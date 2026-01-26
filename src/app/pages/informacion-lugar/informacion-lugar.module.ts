import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // 1. Añadimos la importación aquí

import { IonicModule } from '@ionic/angular';

import { InformacionLugarPageRoutingModule } from './informacion-lugar-routing.module';
import { InformacionLugarPage } from './informacion-lugar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // 2. Lo incluimos en la lista de imports
    IonicModule,
    InformacionLugarPageRoutingModule
  ],
  declarations: [InformacionLugarPage]
})
export class InformacionLugarPageModule {}