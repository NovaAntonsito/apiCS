import {Persona} from "../../models/persona";
import {PersonaDTO} from "./PersonaDTO";

export interface CuentaDTO {
    descripcion? : string;
    persona : PersonaDTO;
}