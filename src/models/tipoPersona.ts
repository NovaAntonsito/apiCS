import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";

import {Persona} from "./persona";
@Entity({name : "tipoPersona"})
export class tipoPersona {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique : true, nullable : false})
    nombre : string

    @ManyToMany(() => Persona, (per) => per.tipoPersona)
    @JoinTable(
        {name : "rel_persona_tipopersona",
            joinColumn: { name: 'tipoPersonaId' },
        inverseJoinColumn: { name: 'personaId' }})
    personasTipo : Persona[];

}