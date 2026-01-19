import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesMusicalesPage } from './detalles-musicales.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesMusicalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesMusicalesPageRoutingModule {}
