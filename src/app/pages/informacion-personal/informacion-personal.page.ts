import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.page.html',
  styleUrls: ['./informacion-personal.page.scss'],
})
export class InformacionPersonalPage implements OnInit {

  personaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    // Inicializamos el formulario con validaciones básicas
    this.personaForm = this.fb.group({
      nombreArtistico: ['', [Validators.required, Validators.minLength(3)]],
      nombreReal: ['', [Validators.required]],
      fechaNacimiento: ['2000-01-01', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  siguiente() {
    if (this.personaForm.valid) {
      const datosPersonales = this.personaForm.value;
      const datosExistentes = JSON.parse(localStorage.getItem('temp_registro') || '{}');
      const registroActualizado = { ...datosExistentes, ...datosPersonales };

      localStorage.setItem('temp_registro', JSON.stringify(registroActualizado));

      // Lógica de ramificación (Branching)
      if (datosExistentes.rol === 'dueno') {
        this.router.navigate(['/informacion-lugar']);
      } else {
        this.router.navigate(['/informacion-contacto']);
      }
    }
  }
}