import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile-espacio',
  templateUrl: './profile-espacio.component.html',
  styleUrls: ['./profile-espacio.component.scss'],
})
export class ProfileEspacioComponent {
  @Input() miLugar: any;
  
  @Output() editarClicked = new EventEmitter<Event>();

  onEditarClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.editarClicked.emit(event);
  }
}