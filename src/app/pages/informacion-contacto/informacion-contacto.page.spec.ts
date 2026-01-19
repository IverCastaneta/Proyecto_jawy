import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformacionContactoPage } from './informacion-contacto.page';

describe('InformacionContactoPage', () => {
  let component: InformacionContactoPage;
  let fixture: ComponentFixture<InformacionContactoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionContactoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
