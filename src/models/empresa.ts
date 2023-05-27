import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm"
import {Persona} from "./persona";

@Entity({name : "Empresa"})
export class Empresa{
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    nombre : string

    @OneToMany(type => Persona, (persona) => persona.empresa)
    empleados : Persona[]
}