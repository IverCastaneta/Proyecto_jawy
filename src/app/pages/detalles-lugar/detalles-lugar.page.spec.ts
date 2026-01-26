import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesLugarPage } from './detalles-lugar.page';

describe('DetallesLugarPage', () => {
  let component: DetallesLugarPage;
  let fixture: ComponentFixture<DetallesLugarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesLugarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
