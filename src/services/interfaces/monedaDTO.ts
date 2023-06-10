import {NacionalidadMoneda} from "../../models/Enums/nacionalidadMoneda";

export interface MonedaDTO {
    id? : number
    codigo? : string
    nombre? : string
    locale? : string
    tipoNacionalidad? : NacionalidadMoneda;
}