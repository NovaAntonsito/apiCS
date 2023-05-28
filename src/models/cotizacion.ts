import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Moneda} from "./moneda";
import {Estado} from "./Enums/estado";

@Entity({name : "cotizaciones"})
export class Cotizaciones{
    @PrimaryGeneratedColumn()
    id: number
    @ManyToOne(type => Moneda, moneda => moneda.cotizaciones)
    moneda: Moneda;
    @Column({name : "valor/precio", type:"double"})
    valor : number
    @Column({name : "fecha_Cotizacion"})
    fechaCotizacion : Date
    @Column({name: "fecha_Vigencia", nullable : true, type : "datetime"})
    fechaVigencia : Date | null
    @Column({name:"estado",
        type:"enum",
        enum: Estado})
    estado : Estado
    @Column({name : "deleted", default : false})
    deleted : boolean
}