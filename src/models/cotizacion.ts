import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Moneda} from "./moneda";

@Entity({name : "cotizaciones"})
export class Cotizaciones{
    @PrimaryGeneratedColumn()
    id: number
    @ManyToMany(() => Moneda, (moneda)=> moneda.cotizaciones)
    @JoinTable({name : "cotizacion_moneda"})
    monedas : Moneda[]
    @Column({name : "valor/precio"})
    valor : number
    @Column({name : "fecha_Cotizacion"})
    fechaCotizacion : Date
    @Column({name: "fecha_Vigencia"})
    fechaVigencia : Date
    @Column({name : "deleted", default : false})
    deleted : boolean
}