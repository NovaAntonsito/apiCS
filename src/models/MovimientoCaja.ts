import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TipoMovimiento} from "./Enums/TipoMovimiento";
import {CuentaCorriente} from "./CuentaCorriente";

@Entity({name : "movCaja"})
export class MovimientoCaja {
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(()=>CuentaCorriente, (cta) => cta.movimiento)
    cta : CuentaCorriente;

    @Column({name : "fecha"})
    fecha : Date;

    @Column({name : "descripcion"})
    descripcion : string;

    @Column({type : "varchar"})
    monto : number

    @Column({type : "enum", enum : TipoMovimiento})
    tipoMovimiento : TipoMovimiento
}