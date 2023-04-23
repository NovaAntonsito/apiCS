import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sucursales } from './sucursal';

@Entity({name: "Provincia"})
export class provincia {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    nombre : string

    @OneToMany(()=>Sucursales,(sucursales) => sucursales.provincia)
    sucursales : Sucursales[]
}