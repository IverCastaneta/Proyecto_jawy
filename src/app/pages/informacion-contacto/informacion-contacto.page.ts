import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion-contacto',
  templateUrl: './informacion-contacto.page.html',
  styleUrls: ['./informacion-contacto.page.scss'],
})
export class InformacionContactoPage implements OnInit {

  contactoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.contactoForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9+]*$')]]
    });
  }

  ngOnInit() {}

  siguiente() {
  if (this.contactoForm.valid) {
    const datosContacto = this.contactoForm.value;
    const datosPrevios = JSON.parse(localStorage.getItem('temp_registro') || '{}');
    const registroTotal = { ...datosPrevios, ...datosContacto };
    
    localStorage.setItem('temp_registro', JSON.stringify(registroTotal));
    
    this.router.navigate(['/detalles-musicales']); 
  }
}
}