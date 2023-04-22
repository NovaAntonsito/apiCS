import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { provincia } from './provincia';

@Entity({name: "Sucursal"})
export class Sucursales{

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @ManyToOne(() => provincia, (provincia) => provincia.nombre)
    provincia : provincia

}