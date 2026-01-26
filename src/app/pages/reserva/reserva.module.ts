import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReservaPageRoutingModule } from './reserva-routing.module';
import { ReservaPage } from './reserva.page';
// 1. Importa el SharedModule aquí
import { SharedModule } from 'src/app/modules/shared/shared.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservaPageRoutingModule,
    SharedModule // 2. Agrégalo a la lista de imports
  ],
  declarations: [ReservaPage]
})
export class ReservaPageModule {}