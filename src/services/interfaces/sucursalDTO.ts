import { provinciaDTO } from "./provinciaDTO";
export interface SucursalDTO {
    id? : number;
    nombre? : string;
    usuario? : string[];
    provincia? : provinciaDTO;
}
