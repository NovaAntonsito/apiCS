import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Cotizaciones} from "./cotizacion";
import {NacionalidadMoneda} from "./Enums/nacionalidadMoneda";
import {CuentaCorriente} from "./CuentaCorriente";

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
    @Column({type : "enum", enum : NacionalidadMoneda})
    tipoNacionalidad : NacionalidadMoneda

    @OneToOne(()=>CuentaCorriente, (cta) => cta.moneda)
    ctas : CuentaCorriente | null;
}