import { provinciaDTO } from "./provinciaDTO";

interface Provincia{
    id? : number,
    nombre? : string,
}

export interface SucursalDTO {
    id? : number;
    name? : string;
    user? : string[];
    provincia? : provinciaDTO;
}
