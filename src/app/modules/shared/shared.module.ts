import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { IonicModule } from '@ionic/angular';
import { TabComponent } from 'src/app/components/tab/tab.component';
import { CardpapuComponent } from 'src/app/components/cardpapu/cardpapu.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { ActionCalendarComponent } from 'src/app/components/action-calendar/action-calendar.component';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
import { DescripcionComponent } from 'src/app/components/descripcion/descripcion.component';
import { CardReservaComponent } from 'src/app/components/card-reserva/card-reserva.component';
import { BackComponent } from 'src/app/components/back/back.component';
import { MinicardsComponent } from 'src/app/components/minicards/minicards.component';
import { ToolbarmarketplaceComponent } from 'src/app/components/toolbarmarketplace/toolbarmarketplace.component';
import { ToolEventosComponent } from 'src/app/components/tool-eventos/tool-eventos.component';
import { EventoComponenteComponent } from 'src/app/components/evento-componente/evento-componente.component';
import { FechaSemanaComponent } from 'src/app/components/fecha-semana/fecha-semana.component';
import { FechaMesComponent } from 'src/app/components/fecha-mes/fecha-mes.component';
import { RouterModule } from '@angular/router';
import { ReservationModalComponent } from 'src/app/components/reservation-modal/reservation-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CardComponent, TabsComponent, TabComponent, CardpapuComponent, 
    ToolbarComponent, ActionCalendarComponent, SearchBarComponent, 
    DescripcionComponent, CardReservaComponent, BackComponent, 
    MinicardsComponent, ToolbarmarketplaceComponent, ToolEventosComponent, 
    EventoComponenteComponent, FechaSemanaComponent, FechaMesComponent, 
    ReservationModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    // Exportamos tus componentes para usarlos en las páginas
    CardComponent, TabsComponent, TabComponent, CardpapuComponent, 
    ToolbarComponent, ActionCalendarComponent, SearchBarComponent, 
    DescripcionComponent, CardReservaComponent, BackComponent, 
    MinicardsComponent, ToolbarmarketplaceComponent, ToolEventosComponent, 
    EventoComponenteComponent, FechaSemanaComponent, FechaMesComponent, 
    ReservationModalComponent,
    // EXPORTAMOS TAMBIÉN ESTOS (Crucial para que no den error las páginas)
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }