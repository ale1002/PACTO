import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Capacitacion } from '../models/capacitacion.models';

@Injectable({
    providedIn: 'root'
})

export class CapacitacionService {

    private url: string = 'https://restserver-pacto.herokuapp.com';

    capacitacionToken: string;

    constructor (private _http: HttpClient) { }

    leerToken(){
        if (localStorage.getItem('token')){
            this.capacitacionToken = localStorage.getItem('token');
        }
        return this.capacitacionToken;
    }

    getCapacitaciones(){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
      
        return this._http.get(`${this.url}/capacitacion`,{headers});
    }

   addCapacitaciones(capacitacion: Capacitacion){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        const authData = {
            
            tem_cap: capacitacion.tem_cap,
            fech_ini_cap: capacitacion.fech_ini_cap,
            fech_fin_cap: capacitacion.fech_fin_cap,
            hora_ini_cap: capacitacion.hora_ini_cap,
            hora_fin_cap: capacitacion.hora_fin_cap,
            id_enti: capacitacion.prof_cap[0].id_enti,
        };
        return this._http.post(`${this.url}/capacitacion`,authData, {headers});
    }

   deleteCapacitacion(capacitacion:Capacitacion){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });  
        return this._http.delete(`${this.url}/capacitacion/${capacitacion._id}`,{headers});
    }
}