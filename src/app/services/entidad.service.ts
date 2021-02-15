import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Entidad } from '../models/entidad.models';


@Injectable({
    providedIn: 'root'
})
export class EntidadService {

    entidades: Entidad[] = [];

    private url: string = 'https://restserver-pacto.herokuapp.com';

    userToken: string;

    constructor(private _http: HttpClient) { }

    leerToken() {
        if (localStorage.getItem('token')) {
            this.userToken = localStorage.getItem('token')
        }
        return this.userToken;
    }

    getEntidades() {
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        
        return this._http.get(`${this.url}/entidad`,{headers});
    }

    addEntidades(entidad:Entidad){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        const authData = {
            nom_enti: entidad.nom_enti,
            tipo_enti: entidad.tipo_enti,
            dir_enti: entidad.dir_enti,
            tel_enti: entidad.tel_enti,
            pais_enti: entidad.pais_enti,
            ciu_enti: entidad.ciu_enti
        };
        return this._http.post(`${this.url}/entidad`,authData, {headers});
    }

    updateEntidad(entidad:Entidad){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        const authData = {
            nom_enti: entidad.nom_enti,
            tipo_enti:entidad.tipo_enti,
            dir_enti:entidad.dir_enti,
            tel_enti:entidad.tel_enti,
            pais_enti:entidad.pais_enti,
            ciu_enti:entidad.ciu_enti
        };
        return this._http.put(`${this.url}/entidad/${entidad._id}`,authData,{headers});
    }

    deleteEntidad(entidad:Entidad){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });  
        return this._http.delete(`${this.url}/entidad/${entidad._id}`,{headers});
    }



}
