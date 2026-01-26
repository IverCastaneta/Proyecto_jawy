import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IWERPageRoutingModule } from './iwer-routing.module';
import { IWERPage } from './iwer.page';
import { SharedModule } from 'src/app/modules/shared/shared.module'; // Importación necesaria

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IWERPageRoutingModule,
    SharedModule // Agrégalo aquí
  ],
  declarations: [IWERPage]
})
export class IWERPageModule {}