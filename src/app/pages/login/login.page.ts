import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  constructor(
    public fb : FormBuilder,
    public auth: AuthService
  ) { 
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.min(6)]],
    })

  }

  ngOnInit() {
  }

  onSubmitForm(){
    if(this.form.valid){
      
      console.log('valores', this.form.value)
      const {email, password} =this.form.value;
      this.auth.loginUser(email, password);
    
    }
    else {
    }
  }


}