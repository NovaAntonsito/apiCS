
interface Sucursal {
    id: number;
    name: string;
}
export interface userDTO {
    id? : number;
    username? : string;
    email? : string;
    password? : string;
    active? : boolean;
    sucursales? : Sucursal[];
}