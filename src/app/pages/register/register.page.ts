import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

// Función validadora para que las contraseñas coincidan
export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    // Retorna null si los campos no se han tocado o están vacíos
    if (!password || !confirmPassword || password.value === '' || confirmPassword.value === '') {
      return null;
    }

    // Retorna 'mismatch' si no son iguales, o null si son iguales
    return password.value === confirmPassword.value ? null : { mismatch: true };
  };
}


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;

  constructor(
    public fb : FormBuilder,
    public auth: AuthService
  ) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]], 
      name: ['', [Validators.required]],
      // Campo requerido por tu servicio de Firebase/Firestore
      username: ['', [Validators.required, Validators.minLength(4)]], 
      phone: ['+591', Validators.required],
      password: ['', [Validators.required, Validators.min(6)]],
      confirmPassword: ['', [Validators.required, Validators.min(6)]],
    }, {
      // Aplica el validador de coincidencia
      validators: passwordMatchValidator()
    })
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    // Inicialización
  }

  onSubmitForm(){
    // Verifica validez de campos individuales y la coincidencia de contraseñas
    if(this.form.valid){
      
      // Desestructuramos todos los campos del formulario
      const { email, password, name, phone, username, confirmPassword } = this.form.value;

      // Objeto COMPLETO de datos para guardar en Firestore/BD. 
      // Incluye email y password para que el servicio los guarde también si es necesario.
      const userData = {
        email: email,
        password: password, 
        name: name,
        phone: phone,
        username: username, 
      };
      
      console.log('Registrando usuario:', email, userData);
      
      // Llama al servicio de autenticación
      this.auth.registerUser(email, password, userData);

    } else {
      console.error('Formulario Inválido. Revise los campos.');
      this.form.markAllAsTouched(); // Muestra errores en el HTML
    }
  }

}