import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesMusicalesPage } from './detalles-musicales.page';

describe('DetallesMusicalesPage', () => {
  let component: DetallesMusicalesPage;
  let fixture: ComponentFixture<DetallesMusicalesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesMusicalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
