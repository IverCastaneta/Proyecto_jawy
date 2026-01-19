import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionContactoPage } from './informacion-contacto.page';

const routes: Routes = [
  {
    path: '',
    component: InformacionContactoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionContactoPageRoutingModule {}
