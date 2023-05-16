interface Provincia {
    id : number,
    nombre : string
}
export interface SucursalDTO {
    id? : number;
    nombre? : string;
    usuario? : string[];
    provincia? : Provincia;
}
