import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Empresa} from "./empresa";
import {Provincia} from "./provincia";
import {Pais} from "./pais";

@Entity({name : "persona"})
export class Persona {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    nombre : string;


    @ManyToOne (type => Empresa, (empresa) => empresa.empleados, {nullable : true})
    empresa : Empresa | null;


    @Column({nullable : true})
    razonSocial : string;


    @Column({nullable : true})
    cuit : number;

    @Column()
    telefono : number;

    @Column()
    direccion : string;


    @ManyToOne(type => Pais, (pais) => pais.personas, {nullable : true})
    pais : Pais | null;


    @ManyToOne(type => Provincia, (provincia) => provincia.personas, {nullable : true})
    provincia : Provincia | null;

    @Column()
    email : string;

}