import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Sucursales } from './sucursal';
import {Persona} from "./persona";
import {Pais} from "./pais";

@Entity({name: "Provincia"})
export class Provincia {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    nombre : string

    @OneToMany(()=>Sucursales,(sucursales) => sucursales.provincia)
    sucursales : Sucursales[] | null

    @OneToMany(type => Persona, (persona) => persona.provincia, {nullable : true})
    personas : Persona[] | null

    @ManyToOne(type => Pais, (pais) => pais.provincias, {nullable : true})
    pais : Pais | null;
}