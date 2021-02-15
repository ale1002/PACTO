import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductoSocioModel, ProductoSocio} from '../models/prodsocio.models';
import { ProductosService } from 'src/app/services/productos.service';

@Injectable({
    providedIn: 'root'
})
export class ProdsocioService{

    prodSocio: ProductoSocio[] = [];

    private url:string = 'https://restserver-pacto.herokuapp.com';

    prodToken: string;

    constructor(private _http: HttpClient){}

    leerToken() {
        if (localStorage.getItem('token')) {
            this.prodToken = localStorage.getItem('token')
        }
        return this.prodToken;
    }

    getProdSocio() {
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        console.log(this.prodToken);
        return this._http.get(`${this.url}/prodSocio`,{headers});
    }    

    addProdSocio(productoSocio1:ProductoSocio){
        console.log(productoSocio1.id_pro);
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        const authData={
            id_pro:productoSocio1.id_pro,
            id_soc:productoSocio1.id_soc,
            aso_ps:productoSocio1.aso_ps,
            can_ps: productoSocio1.can_ps,
            pre_ps: productoSocio1.pre_ps,
            fech_ps: productoSocio1.fech_ps,
            fecha_ela_pro: productoSocio1.fecha_ela_pro,
            fecha_cad_pro:productoSocio1.fecha_cad_pro,
        };
        return this._http.post(`${this.url}/prodSocio`,authData, {headers});
    }


    /*updateProductos(producto1:Producto){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });

        const authData = {
            id_cat:producto1.id_cat,
            nom_pro: producto1.nom_pro,
            desc_pro: producto1.desc_pro,
            uni_pro: producto1.uni_pro,
            sto_pro: producto1.sto_pro,
            pvp_pro:producto1.pvp_pro,
            fecha_ela_pro: producto1.fecha_ela_pro,
            fecha_cad_pro: producto1.fecha_cad_pro
        };
        return this._http.put(`${this.url}/producto/${producto1._id}`,authData,{headers});
    }*/

    deleteProductosSocio(productoSocio1:ProductoSocio){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });  
        return this._http.delete(`${this.url}/prodSocio/${productoSocio1._id}`,{headers});
     }   
}
