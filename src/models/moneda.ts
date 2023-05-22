import {Column, Entity,OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Cotizaciones} from "./cotizacion";

@Entity({name:"moneda"})
export class Moneda{
    @PrimaryGeneratedColumn()
    id: number
    @Column({name: "codigoSwift"})
    codigo : string
    @Column({name: "nombre"})
    nombre : string
    @OneToMany(type => Cotizaciones, coti => coti.moneda)
    cotizaciones: Cotizaciones[];
    @Column({name : "locale"})
    locale : string;
}