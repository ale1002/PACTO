import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.models';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  signupForm: FormGroup;
  recordarme = false;
  usuario: UsuarioModel = new UsuarioModel();

  constructor(private _router:Router, private _builder: FormBuilder, private auth: LoginService) {
    this.signupForm = this._builder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required],
      recordarme: ['',],
    });
  }

  ngOnInit(): void {
    // Recordarme 
    if(localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  enviar(values){
    
    this.usuario.email = values['email'];
    this.usuario.password = values['password'];
    this.recordarme = values['recordarme'];

    Swal.fire({
      title: 'Espere',
      text: 'Cargando Información',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false
    });

    Swal.showLoading();

    this.auth.login(this.usuario).subscribe(resp => {
      this.usuario.role = resp['role'];
      
      Swal.close();

      // Recordarme
      if (this.recordarme) {
        localStorage.setItem('email',this.usuario.email);
      }


      this._router.navigateByUrl('/users');
    },(err) => {
      Swal.fire({
        title: 'Error',
        text: err.error.err.message,
        icon: 'error',
      });
    });
  }
}
