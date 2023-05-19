import {SucursalDTO} from "./sucursalDTO";

export interface userDTO {
    id? : number;
    username? : string;
    email? : string;
    password? : string;
    active? : boolean;
    sucursales? : SucursalDTO[];
}