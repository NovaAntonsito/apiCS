import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Persona} from "./persona";
import {Moneda} from "./moneda";
import {MovimientoCaja} from "./MovimientoCaja";

@Entity({name : "Cuenta_Corriente"})
export class CuentaCorriente {

    @PrimaryGeneratedColumn()
    id : number;
    @OneToOne(()=>Persona, (per) => per.cta)
    @JoinColumn({name : "persona_id_fk"})
    persona : Persona | null;

    @OneToOne(()=>Moneda, (moneda) =>moneda.ctas)
    @JoinColumn({name : "moneda_id_fk"})
    moneda : Moneda | null;

    @Column({type: "varchar", nullable : false})
    saldo : number;

    @OneToMany(()=> MovimientoCaja, (mov) => mov.cta)
    movimiento : MovimientoCaja[]
}