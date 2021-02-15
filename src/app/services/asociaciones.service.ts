import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AsociacionesModel, Asociacion} from '../models/asociaciones.models';

@Injectable({
    providedIn: 'root'
})
export class AsociacionesService{

    asociaciones: Asociacion[] = [];

    private url:string = 'https://restserver-pacto.herokuapp.com';

    asoToken: string;

    constructor(private _http: HttpClient){}

    leerToken() {
        if (localStorage.getItem('token')) {
            this.asoToken = localStorage.getItem('token')
        }
        return this.asoToken;
    }

    getAsociaciones() {
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        console.log(this.asoToken);
        
        return this._http.get(`${this.url}/asociacion`,{headers});
    }

    addAsociaciones(asociacion1:Asociacion){
        console.log(asociacion1.nombre_aso);
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        const authData={
            nombre_aso: asociacion1.nombre_aso,
            certificado_aso: asociacion1.certificado_aso,
            sector_aso: asociacion1.sector_aso,
            barrio_aso: asociacion1.barrio_aso,
            parroquia_aso: asociacion1.parroquia_aso
        };
        return this._http.post(`${this.url}/asociacion`,authData, {headers});
    }

    updateAsociaciones(asociacion1:Asociacion){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });

        const authData = {
          nombre_aso: asociacion1.nombre_aso,
          certificado_aso: asociacion1.certificado_aso,
          sector_aso: asociacion1.sector_aso,
          barrio_aso: asociacion1.barrio_aso,
          parroquia_aso: asociacion1.parroquia_aso
        };
        return this._http.put(`${this.url}/asociacion/${asociacion1._id}`,authData,{headers});
    }

    deleteAsociaciones(asociacion1:Asociacion){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });  
        return this._http.delete(`${this.url}/asociacion/${asociacion1._id}`,{headers});
     }   
}

