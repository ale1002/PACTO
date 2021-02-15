import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reuniones } from '../models/reunion.models';


@Injectable({
    providedIn: 'root'
})
export class ReunionService {

    
    private url: string = 'https://restserver-pacto.herokuapp.com';

    reuToken: string;

    constructor(private _http: HttpClient) { }

    leerToken() {
        if (localStorage.getItem('token')) {
            this.reuToken = localStorage.getItem('token')
        }
        return this.reuToken;
    }

    getReunion() {
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        
        return this._http.get(`${this.url}/reuniones`,{headers});
    }
   

   addReunion(reunion:Reuniones){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
      ;
        const authData = {
           // id_asoc_reu:reunion.id_asoc_reu,
            tema_reun:reunion.tema_reun,
            tipo_reun:reunion.tipo_reun,
            fec_reu: reunion.fec_reu,
            hor_reu:reunion.hor_reu,
            mul_reu:reunion.mul_reu,
            id_sco: reunion.asistencia[0].id_soc,
            asist_socio:reunion.asistencia[1].asist_socio,
                    };
        return this._http.post(`${this.url}/reuniones`,authData, {headers});
    }

    /*updateUser(usuario:Usuario){
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
            role:usuario.role
        };
        
        return this._http.put(`${this.url}/usuario/${usuario._id}`,authData,{headers});
    }

    deleteUser(usuario:Usuario){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });  
        return this._http.delete(`${this.url}/usuario/${usuario._id}`,{headers});
    }*/
}
