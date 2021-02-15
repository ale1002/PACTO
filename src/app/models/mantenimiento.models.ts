export class MantenimientoModel{
    id_maq_soc: string;
    fech_man_maq:Date;
    tipo_man_maq:string;
    des_man_maq:string;
    check_man_maq:string;
    costo_man_maq:string;
    proximo_man_maq: Date;
    marca_man_maq:string;
    km_man_maq:string;
    placa_man_maq:string;
    origen_man_maq:string;
}

export interface Mantenimiento{
    id_maq_soc: string;
    fech_man_maq:Date;
    tipo_man_maq:string;
    des_man_maq:string;
    check_man_maq:string;
    costo_man_maq:string;
    proximo_man_maq: Date;
    marca_man_maq:string;
    km_man_maq:string;
    placa_man_maq:string;
    origen_man_maq:string;
}

