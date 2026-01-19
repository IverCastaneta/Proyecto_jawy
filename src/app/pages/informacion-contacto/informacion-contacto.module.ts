import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // << Aquí
import { IonicModule } from '@ionic/angular';
import { InformacionContactoPageRoutingModule } from './informacion-contacto-routing.module';
import { InformacionContactoPage } from './informacion-contacto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // << Y aquí
    IonicModule,
    InformacionContactoPageRoutingModule
  ],
  declarations: [InformacionContactoPage]
})
export class InformacionContactoPageModule {}