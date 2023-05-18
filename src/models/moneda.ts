import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Cotizaciones} from "./cotizacion";

@Entity({name:"moneda"})
export class Moneda{
    @PrimaryGeneratedColumn()
    id: number
    @Column({name: "codigoSwift"})
    codigo : string
    @Column({name: "nombre"})
    nombre : string
    @ManyToMany(() => Cotizaciones, coti => coti.monedas)
    cotizaciones : Cotizaciones[]
}