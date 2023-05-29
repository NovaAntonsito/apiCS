import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Provincia} from "./provincia";
import {Pais} from "./pais";
import {TipoTransaccion} from "./Enums/tipoTransaccion";

@Entity({name : "persona"})
export class Persona {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    nombre : string;

    @Column({type:"enum", enum :TipoTransaccion, nullable : true })
    tipoTransaccion : TipoTransaccion;

    @Column({nullable : true})
    razonSocial : string;

    @Column({nullable : true, type : "varchar"})
    cuit : number;

    @Column({type: "varchar"})
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