import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Maquinarian } from '../models/maquinarian.models';


@Injectable({
    providedIn: 'root'
})
export class MaquinarianService {

    maquinarias: Maquinarian []= [];

    private url: string = 'https://restserver-pacto.herokuapp.com';
    maqToken: string;
    constructor(private _http: HttpClient) { }
    leerToken() {
        if (localStorage.getItem('token')) {
            this.maqToken = localStorage.getItem('token')
        }
        return this.maqToken;
    }

    getMaquinarian() {
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        console.log(this.maqToken);
        return this._http.get(`${this.url}/maquinariasocio`,{headers});
    }

   addMaquinaria(maquinaria1:Maquinarian){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
       
        const authData = {
            nom_maq: maquinaria1.nom_maq,
            tipo_maq: maquinaria1.tipo_maq,
            est_maq: maquinaria1.est_maq,
            
        };
        return this._http.post(`${this.url}/maquinariasocio`,authData, {headers});
    }

   /* updatePedido(pedido:Pedido){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        const authData = {
            id_cat: pedido.id_cat,
            nom_pro: pedido.nom_pro,
            desc_pro: pedido.desc_pro,
            uni_pro: pedido.uni_pro,
            
        };
        return this._http.put(`${this.url}/producto/${prodcuto._id}`,authData,{headers});
    }

    deleteEntidad(entidad:Entidad){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });  
        return this._http.delete(`${this.url}/entidad/${entidad._id}`,{headers});
    }*/



}
