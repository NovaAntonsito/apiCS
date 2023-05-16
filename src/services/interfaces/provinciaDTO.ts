interface Sucursales{
    id : number,
    nombre : string
}
export interface provinciaDTO{
    id? : number,
    nombre? : string,
    sucursales? : Sucursales[];
}