import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IWERPage } from './iwer.page';

const routes: Routes = [
  {
    path: '',
    component: IWERPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // ¡ASEGÚRATE DE QUE AQUÍ NO ESTÉ EL SharedModule!
  exports: [RouterModule],
})
export class IWERPageRoutingModule {}