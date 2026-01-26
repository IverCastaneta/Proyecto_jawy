import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LugarPage } from './lugar.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: LugarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, SharedModule],
})
export class LugarPageRoutingModule {}
