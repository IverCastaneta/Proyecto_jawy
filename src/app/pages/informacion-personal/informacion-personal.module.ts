import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // << Añade ReactiveFormsModule aquí

import { IonicModule } from '@ionic/angular';

import { InformacionPersonalPageRoutingModule } from './informacion-personal-routing.module';
import { InformacionPersonalPage } from './informacion-personal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // << Y aquí también
    IonicModule,
    InformacionPersonalPageRoutingModule
  ],
  declarations: [InformacionPersonalPage]
})
export class InformacionPersonalPageModule {}