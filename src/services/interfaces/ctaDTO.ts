import {MonedaDTO} from "./monedaDTO";
import {PersonaDTO} from "./PersonaDTO";

export interface CtaDTO {
     id : number;
     persona: PersonaDTO;
     moneda: MonedaDTO;
     saldo : number;
}