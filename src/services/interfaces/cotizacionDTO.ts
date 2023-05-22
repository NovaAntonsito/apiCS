import {MonedaDTO} from "./monedaDTO";
import {Estado} from "../../models/Enums/estado";

export interface CotizacionDTO{
    id? : number,
    moneda : MonedaDTO
    valor : number
    estado : Estado
    fechaCotizacion : Date
    fechaVigencia : Date
    deleted : boolean
}