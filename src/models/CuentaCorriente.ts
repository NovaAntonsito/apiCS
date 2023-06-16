import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Persona} from "./persona";
import {Moneda} from "./moneda";

@Entity({name : "Cuenta_Corriente"})
export class CuentaCorriente {

    @PrimaryGeneratedColumn()
    id : number;
    @OneToOne(()=>Persona, (per) => per.cta)
    @JoinColumn({name : "persona_id_fk"})
    persona : Persona;

    @ManyToOne(()=>Moneda, (moneda) =>moneda.ctas)
    @JoinColumn({name : "moneda_id_fk"})
    moneda : Moneda;

    @Column({type: "varchar", nullable : false})
    saldo : number;
}