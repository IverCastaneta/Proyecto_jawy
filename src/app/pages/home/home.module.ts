import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
// 1. IMPORTA EL SHARED MODULE AQUÍ
import { SharedModule } from 'src/app/modules/shared/shared.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule // 2. AGRÉGALO A LOS IMPORTS
  ],
  declarations: [HomePage]
})
export class HomePageModule {}