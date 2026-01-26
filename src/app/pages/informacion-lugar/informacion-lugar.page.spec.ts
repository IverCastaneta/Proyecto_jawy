import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformacionLugarPage } from './informacion-lugar.page';

describe('InformacionLugarPage', () => {
  let component: InformacionLugarPage;
  let fixture: ComponentFixture<InformacionLugarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionLugarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
