import { Column, Entity, ManyToOne, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Provincia } from './provincia';
import { User } from './user';

@Entity({name: "Sucursal"})
export class Sucursales{

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    nombre : string
    @ManyToMany(()=>User,(user) => user.sucursales)
    usuarios : User[]
    
    @ManyToOne(() => Provincia, (Provincia) => Provincia.sucursales)
    provincia : Provincia

}