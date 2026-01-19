import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinalizarRegistroPageRoutingModule } from './finalizar-registro-routing.module';

import { FinalizarRegistroPage } from './finalizar-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalizarRegistroPageRoutingModule
  ],
  declarations: [FinalizarRegistroPage]
})
export class FinalizarRegistroPageModule {}
