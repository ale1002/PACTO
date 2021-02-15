import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.models';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { 
    this.leerToken();
  }

  private url:string = 'https://restserver-pacto.herokuapp.com';

  userToken: string;

  login(usuario:UsuarioModel) {
    
    const authData = {
      email: usuario.email,
      password: usuario.password
    };

    return this.http.post(
      `${this.url}/login`,authData
    ).pipe(
      map( resp => {
        this.guardarToken(resp['token']);
        return resp;
      })
    )
  }


  logout() {
    localStorage.removeItem('token');
  }

  private guardarToken(token:string) {
    this.userToken = token;
    localStorage.setItem('token',token);

    let hoy = new Date();
    hoy.setHours(168);
    
    localStorage.setItem('expira',hoy.getTime().toString());


  }

  leerToken() {
    if(localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token')
    }else {
      this.userToken = '';
    }

    return this.userToken;
  }


  isAuthenticated(): boolean {
    
    if (this.userToken.length < 2 ) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    }else {
      return false;
    }
  }
}
