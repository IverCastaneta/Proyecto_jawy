import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinalizarRegistroPage } from './finalizar-registro.page';

describe('FinalizarRegistroPage', () => {
  let component: FinalizarRegistroPage;
  let fixture: ComponentFixture<FinalizarRegistroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarRegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
