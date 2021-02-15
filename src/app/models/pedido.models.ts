import { from } from 'rxjs';
import {UsuarioModel} from './usuario.models';
import {ProductosModel} from './productos.models';

export class PedidoModel{
    _id:string;
    id_cli: string;
    fec_fac: Date;
    tot_fac: number;
    estado: string;
    detalle: [
        {
            _id: string;
            id_pro: string;
            cantidad: number;
            subtotal: number;
        }
    ]
}

export interface Pedido{
    _id:string;
    id_cli: string;
    fec_fac: Date;
    tot_fac: number;
    estado: string;
    detalle: [
        {
            _id: string;
            id_pro: string;
            cantidad: number;
            subtotal: number;
        }
    ]
    
}
