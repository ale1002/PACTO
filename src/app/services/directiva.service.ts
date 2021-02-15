import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Directiva } from '../models/directiva.models';


@Injectable({
    providedIn: 'root'
})
export class DirectivaService {

    private url: string = 'https://restserver-pacto.herokuapp.com';

    dirToken: string;

    constructor(private _http: HttpClient) { }

    leerToken() {
        if (localStorage.getItem('token')) {
            this.dirToken = localStorage.getItem('token')
        }
        return this.dirToken;
    }

    getDirectives() {
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        
        return this._http.get(`${this.url}/directiva`,{headers});
    }

    getAso(){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        
        return this._http.get(`${this.url}/asociacion`,{headers});
    }

    addDirectives(directiva:Directiva){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        const authData = {
        cargo_dir: directiva.cargo_dir,
        nom_dir:directiva.nom_dir,
        ape_dir:directiva.ape_dir,
        periodo_dir:directiva.periodo_dir,
        id_asoc:directiva.id_asoc
        };
        return this._http.post(`${this.url}/directiva`,authData, {headers});
    }

    updateDirective(directiva:Directiva){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });

        const authData = {
        cargo_dir: directiva.cargo_dir,
        nom_dir:directiva.nom_dir,
        ape_dir:directiva.ape_dir,
        periodo_dir:directiva.periodo_dir,
        id_asoc:directiva.id_asoc
        };
        
        return this._http.put(`${this.url}/directiva/${directiva._id}`,authData,{headers});
    }

    deleteDirective(directiva:Directiva){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });  
        return this._http.delete(`${this.url}/directiva/${directiva._id}`,{headers});
    }
}
