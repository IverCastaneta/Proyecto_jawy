import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionLugarPage } from './informacion-lugar.page';

const routes: Routes = [
  {
    path: '',
    component: InformacionLugarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionLugarPageRoutingModule {}
