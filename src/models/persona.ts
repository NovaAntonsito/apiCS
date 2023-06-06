import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Provincia} from "./provincia";
import {Pais} from "./pais";
import {tipoPersona} from "./tipoPersona";



@Entity({name : "persona"})
export class Persona {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    nombre : string;

    @ManyToMany(() => tipoPersona, (tipos) => tipos.personasTipo, {nullable : true, onDelete: "CASCADE"})
    tipoPersona : tipoPersona[] | null;

    @Column({nullable : true})
    razonSocial : string;

    @Column({nullable : true, type : "varchar"})
    cuit : number;

    @Column({type: "varchar"})
    telefono : number;

    @Column({type: "datetime"})
    fechaSubida : Date;

    @Column()
    direccion : string;

    @ManyToOne(type => Pais, (pais) => pais.personas, {nullable : true})
    pais : Pais | null;

    @ManyToOne(type => Provincia, (provincia) => provincia.personas, {nullable : true})
    provincia : Provincia | null;

    @Column()
    email : string;

}