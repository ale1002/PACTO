import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mantenimiento } from '../models/mantenimiento.models';


@Injectable({
    providedIn: 'root'
})
export class MantenimientoService {

    mantenimientos: Mantenimiento []= [];

    private url: string = 'https://restserver-pacto.herokuapp.com';

    manToken: string;

    constructor(private _http: HttpClient) { }

    leerToken() {
        if (localStorage.getItem('token')) {
            this.manToken = localStorage.getItem('token')
        }
        return this.manToken;
    }

    getMantenimiento() {
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        console.log(this.manToken);
        return this._http.get(`${this.url}/mantenimientomaqsocio`,{headers});
    }

   addMantenimiento(mantenimiento1:Mantenimiento){
    console.log(mantenimiento1);
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
       
        const authData = {

            //nom_pro: maquinarias.nom_pro,
            fech_man_maq: mantenimiento1.fech_man_maq,
            tipo_man_maq: mantenimiento1.tipo_man_maq,
            des_man_maq: mantenimiento1.des_man_maq,
            check_man_maq: mantenimiento1.check_man_maq,
            costo_man_maq: mantenimiento1.costo_man_maq,
            proximo_man_maq: mantenimiento1.proximo_man_maq,
            marca_man_maq: mantenimiento1.marca_man_maq,
            km_man_maq: mantenimiento1.km_man_maq,
            placa_man_maq: mantenimiento1.placa_man_maq,
            origen_man_maq: mantenimiento1.origen_man_maq
        };
        return this._http.post(`${this.url}/mantenimientomaqsocio`,authData, {headers});
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
