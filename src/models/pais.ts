import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Provincia} from "./provincia";
import {Persona} from "./persona";

@Entity({name : "pais"})
export class Pais{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre : string

    @OneToMany(type => Provincia, (provincia) => provincia.pais, {nullable : true})
    provincias : Provincia[] | null

    @OneToMany(type => Persona, (persona) => persona.pais, {nullable : true})
    personas : Persona[] | null
}