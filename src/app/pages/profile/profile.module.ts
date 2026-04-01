import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { EditarLugarComponent } from '../../components/editar-lugar/editar-lugar.component';
import { RechazarReservaComponent } from '../../components/rechazar-reserva/rechazar-reserva.component';
import { EditarPerfilComponent } from '../../components/editar-perfil/editar-perfil.component';
import { ProfileGestionComponent } from '../../components/profile-gestion/profile-gestion.component';
import { ProfileEspacioComponent } from '../../components/profile-espacio/profile-espacio.component'; // <-- IMPORTADO

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    SharedModule
  ],
  declarations: [
    ProfilePage,
    EditarLugarComponent,
    RechazarReservaComponent,
    EditarPerfilComponent,
    ProfileGestionComponent,
    ProfileEspacioComponent 
  ]
})
export class ProfilePageModule {}