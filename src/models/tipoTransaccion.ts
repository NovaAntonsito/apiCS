import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";

import {Persona} from "./persona";
@Entity({name : "TipoTransaccion"})
export class TipoTransaccion {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique : true, nullable : false})
    tipoTransaccion : string

    @ManyToMany(() => Persona, (per) => per.tipos)
    @JoinTable({name : "tipos-Personas"})
    personasTipo : Persona[];

}