import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilArtisticoPageRoutingModule } from './perfil-artistico-routing.module';

import { PerfilArtisticoPage } from './perfil-artistico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilArtisticoPageRoutingModule
  ],
  declarations: [PerfilArtisticoPage]
})
export class PerfilArtisticoPageModule {}
