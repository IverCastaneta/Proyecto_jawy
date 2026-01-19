import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinalizarRegistroPage } from './finalizar-registro.page';

const routes: Routes = [
  {
    path: '',
    component: FinalizarRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalizarRegistroPageRoutingModule {}
