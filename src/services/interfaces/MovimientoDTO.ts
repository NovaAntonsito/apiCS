import {CtaDTO} from "./ctaDTO";
import {TipoMovimiento} from "../../models/Enums/TipoMovimiento";

export interface MovimientoDTO{
    cta : CtaDTO
    descripcion : string,
    fecha : Date,
    monto : number,
    tipoMovimiento : TipoMovimiento
}