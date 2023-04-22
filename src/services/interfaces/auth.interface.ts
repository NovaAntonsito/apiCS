import { Sucursales } from '../../models/sucursal';
export interface auth {
    username : string;
    email : string;
    password : string;
    active? : boolean;
    sucursalname : string;
}