import {Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn} from "typeorm";
import {Provincia} from "./provincia";
import {Pais} from "./pais";
import {TipoPersona} from "./tipoPersona";
import {Cuenta} from "./cuenta";




@Entity({name : "persona"})
export class Persona {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    nombre : string;

    @ManyToMany(() => TipoPersona, (tipos) => tipos.personasTipo, {nullable : true, onDelete: "CASCADE"})
    tipoPersona : TipoPersona[] | null;

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

    @OneToOne(()=>Cuenta, (cuenta) =>cuenta.persona)
    @JoinColumn({name : "cuenta_per_id"})
    cuenta : Cuenta;

}