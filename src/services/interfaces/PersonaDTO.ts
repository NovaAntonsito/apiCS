import {provinciaDTO} from "./provinciaDTO";
import {PaisDTO} from "./paisDTO";
import {TipoDTO} from "./tipoDTO";

export interface PersonaDTO{

    id: number;

    nombre: string;

    tipoPersona?: TipoDTO[];

    razonSocial?: string;

    cuit?: number;

    telefono: number;

    direccion: string;

    pais?: PaisDTO | null;

    provincia?: provinciaDTO | null;

    email: string;

}