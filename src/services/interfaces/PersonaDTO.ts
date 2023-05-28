import {TipoTransaccion} from "../../models/Enums/tipoTransaccion";
import {provinciaDTO} from "./provinciaDTO";
import {PaisDTO} from "./paisDTO";

export interface PersonaDTO{

    id: number;

    nombre: string;

    tipoTransaccion?: TipoTransaccion;

    razonSocial?: string;

    cuit?: number;

    telefono: number;

    direccion: string;

    pais?: PaisDTO | null;

    provincia?: provinciaDTO | null;

    email: string;

}