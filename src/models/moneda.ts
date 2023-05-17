import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Cotizaciones} from "./cotizacion";

@Entity({name:"moneda"})
export class Moneda{
    @PrimaryGeneratedColumn()
    id: number
    @Column({name: "codigoSwift"})
    codigo : string
    @Column({name: "nombre"})
    nombre : string
    @ManyToOne(type => Cotizaciones, coti => coti.monedas)
    cotizaciones : Cotizaciones
}