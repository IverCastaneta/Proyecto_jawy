import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio', // Redirige automáticamente al inicio
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then(m => m.NotificationsPageModule)
  },
  {
    path: 'ui-components',
    loadChildren: () => import('./pages/ui-components/ui-components.module').then(m => m.UiComponentsPageModule)
  },
  {
    path: 'reserva',
    loadChildren: () => import('./pages/reserva/reserva.module').then(m => m.ReservaPageModule)
  },
  {
    path: 'lugar',
    loadChildren: () => import('./pages/lugar/lugar.module').then(m => m.LugarPageModule)
  },
  {
    path: 'iwer',
    loadChildren: () => import('./pages/iwer/iwer.module').then(m => m.IWERPageModule)
  },
  {
    path: 'marketplace/:uid',
    loadChildren: () => import('./pages/marketplace/marketplace.module').then(m => m.MarketplacePageModule)
  },
  {
    path: 'eventos/:uid',
    loadChildren: () => import('./pages/eventos/eventos.module').then(m => m.EventosPageModule)
  },
  {
    path: 'evento-page',
    loadChildren: () => import('./pages/evento-page/evento-page.module').then(m => m.EventoPagePageModule)
  },
  {
    path: 'por',
    loadChildren: () => import('./pages/por/por.module').then(m => m.PorPageModule)
  },
  {
    path: 'view-profile/:uid',
    loadChildren: () => import('./pages/view-profile/view-profile.module').then(m => m.ViewProfilePageModule)
  },
  {
    path: 'view-evento/:idEvento',
    loadChildren: () => import('./pages/view-evento/view-evento.module').then(m => m.ViewEventoPageModule)
  },
  {
    path: 'view-lugar/:idLugar',
    loadChildren: () => import('./pages/view-lugar/view-lugar.module').then(m => m.ViewLugarPageModule)
  },
  {
    path: 'add-lugar',
    loadChildren: () => import('./pages/add-lugar/add-lugar.module').then(m => m.AddLugarPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioPageModule)
  },
  {
    path: 'seleccion-rol',
    loadChildren: () => import('./pages/seleccion-rol/seleccion-rol.module').then(m => m.SeleccionRolPageModule)
  },
  {
    path: 'informacion-personal',
    loadChildren: () => import('./pages/informacion-personal/informacion-personal.module').then(m => m.InformacionPersonalPageModule)
  },
  {
    path: 'informacion-contacto',
    loadChildren: () => import('./pages/informacion-contacto/informacion-contacto.module').then(m => m.InformacionContactoPageModule)
  },
  {
    path: 'detalles-musicales',
    loadChildren: () => import('./pages/detalles-musicales/detalles-musicales.module').then(m => m.DetallesMusicalesPageModule)
  },
  {
    path: 'perfil-artistico',
    loadChildren: () => import('./pages/perfil-artistico/perfil-artistico.module').then(m => m.PerfilArtisticoPageModule)
  },
  {
    path: 'finalizar-registro',
    loadChildren: () => import('./pages/finalizar-registro/finalizar-registro.module').then(m => m.FinalizarRegistroPageModule)
  },
  {
    path: 'informacion-lugar',
    loadChildren: () => import('./pages/informacion-lugar/informacion-lugar.module').then(m => m.InformacionLugarPageModule)
  },
  {
    path: 'detalles-lugar',
    loadChildren: () => import('./pages/detalles-lugar/detalles-lugar.module').then(m => m.DetallesLugarPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
