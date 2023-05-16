
interface Sucursal {
    id: number;
    nombre: string;
}
export interface userDTO {
    id? : number;
    username? : string;
    email? : string;
    password? : string;
    active? : boolean;
    sucursales? : Sucursal[];
}