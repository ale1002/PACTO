export class ProductoSocioModel{
    _id:string;
    id_pro: string;
    id_soc: string;
    aso_ps: string;
    can_ps:number;
    pre_ps: number;
    fech_ps: Date;
    fecha_ela_pro: Date;
    fecha_cad_pro: Date;
}

export interface ProductoSocio{
    _id: string;
    id_pro: string;
    id_soc: string;
    aso_ps: string;
    can_ps:number;
    pre_ps: number;
    fech_ps: Date;
    fecha_ela_pro: Date;
    fecha_cad_pro: Date;
}