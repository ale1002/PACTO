export class ProductosModel{
    _id:string;
    id_cat: string;
    aso_ps: string;
    nom_pro: string;
    desc_pro: string;
    uni_pro: number;
    sto_pro: number;
    pvp_pro: number;
}

export interface Producto{
    _id:string;
    id_cat:string;
    aso_ps: string;
    nom_pro:string;
    desc_pro:string;
    uni_pro:number;
    sto_pro:number;
    pvp_pro:number;
}


