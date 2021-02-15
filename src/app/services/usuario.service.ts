import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario.models';


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private url: string = 'https://restserver-pacto.herokuapp.com';

    userToken: string;

    constructor(private _http: HttpClient) { }

    leerToken() {
        if (localStorage.getItem('token')) {
            this.userToken = localStorage.getItem('token')
        }
        return this.userToken;
    }

    getUsers() {
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        
        return this._http.get(`${this.url}/usuario`,{headers});
    }

    getAso(){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        
        return this._http.get(`${this.url}/asociacion`,{headers});
    }

    addUsers(usuario:Usuario){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        const authData = {
            nombre: usuario.nombre,
            apellido:usuario.apellido,
            tlfc:usuario.tlfc,
            email:usuario.email,
            password:usuario.password,
            tlfm:usuario.tlfm,
            hectareas:usuario.hectareas,
            sector:usuario.sector,
            barrio:usuario.barrio,
            parroquia:usuario.parroquia,
            estado:usuario.estado,
            role:usuario.role,
            id_asociacion:usuario.id_asociacion,
        };
        return this._http.post(`${this.url}/usuario`,authData, {headers});
    }

    updateUser(usuario:Usuario){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });

        const authData = {
            nombre: usuario.nombre,
            apellido:usuario.apellido,
            tlfc:usuario.tlfc,
            tlfm:usuario.tlfm,
            hectareas:usuario.hectareas,
            sector:usuario.sector,
            barrio:usuario.barrio,
            parroquia:usuario.parroquia,
            estado:usuario.estado,
            role:usuario.role,
            id_asociacion:usuario.id_asociacion,
        };
        
        return this._http.put(`${this.url}/usuario/${usuario._id}`,authData,{headers});
    }

    deleteUser(usuario:Usuario){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });  
        return this._http.delete(`${this.url}/usuario/${usuario._id}`,{headers});
    }
}
