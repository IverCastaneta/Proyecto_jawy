import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilArtisticoPage } from './perfil-artistico.page';

describe('PerfilArtisticoPage', () => {
  let component: PerfilArtisticoPage;
  let fixture: ComponentFixture<PerfilArtisticoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilArtisticoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
