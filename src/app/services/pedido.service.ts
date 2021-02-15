import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PedidoModel, Pedido } from '../models/pedido.models';
import { ProductosModel, Producto} from '../models/productos.models';


@Injectable({
    providedIn: 'root'
})
export class PedidoService {

    productos: Producto[] = [];

    pedidos: Pedido [] = [];
    private url: string = 'https://restserver-pacto.herokuapp.com';
    pedToken: string;

    constructor(private _http: HttpClient) { }

    leerToken() {
        if (localStorage.getItem('token')) {
            this.pedToken = localStorage.getItem('token')
        }
        return this.pedToken;
    }

    getPedidos() {
        const headers = new HttpHeaders({
            'token': localStorage.getItem('token')
        });
        //console.log(this.pedToken);
        return this._http.get(`${this.url}/factura`,{headers});
    }

    getProductos() {
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        //console.log(this.prodToken);
        return this._http.get(`${this.url}/producto`,{headers});
    }

    addProductos(producto1:Producto){
        console.log(producto1.nom_pro);
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        const authData={
            nom_pro: producto1.nom_pro,
            desc_pro: producto1.desc_pro
        };
        return this._http.post(`${this.url}/producto`,authData, {headers});
    }
    

    addPedido(pedido1:Pedido){
        
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        
        const authData = {
            id_cli: pedido1.id_cli,
            fec_fac: pedido1.fec_fac,
            tot_fac: pedido1.tot_fac,
            estado: pedido1.estado,
            
            
        };
        return this._http.post(`${this.url}/producto`,authData, {headers});
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
