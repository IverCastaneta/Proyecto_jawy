import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilArtisticoPage } from './perfil-artistico.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilArtisticoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilArtisticoPageRoutingModule {}
