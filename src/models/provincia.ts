import { Column, Entity, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sucursales } from './sucursal';

@Entity({name: "Provincia"})
export class Provincia {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    nombre : string

    @OneToMany(()=>Sucursales,(sucursales) => sucursales.provincia, { onDelete:"CASCADE",})
    sucursales : Sucursales[] | null
}