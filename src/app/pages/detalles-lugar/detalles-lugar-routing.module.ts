import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesLugarPage } from './detalles-lugar.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesLugarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesLugarPageRoutingModule {}
