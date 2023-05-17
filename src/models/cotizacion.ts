import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Moneda} from "./moneda";

@Entity({name : "cotizaciones"})
export class Cotizaciones{
    @PrimaryGeneratedColumn()
    id: number
    @OneToMany(type => Moneda, moneda => moneda.cotizaciones)
    monedas : Moneda[]
    @Column({name : "valor/precio"})
    valor : number
    @Column({name : "fecha_Cotizacion"})
    fechaCotizacion : Date
    @Column({name: "fecha_Vigencia"})
    fechaVigencia : Date

}