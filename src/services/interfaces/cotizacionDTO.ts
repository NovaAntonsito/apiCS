import {MonedaDTO} from "./monedaDTO";

export interface CotizacionDTO{
    id? : number,
    monedas : MonedaDTO[]
    valor : number
    fechaCotizacion : Date
    fechaVigencia : Date
    deleted : boolean
}