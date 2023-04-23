import { Column, Entity, ManyToOne, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { provincia } from './provincia';
import { User } from './user';

@Entity({name: "Sucursal"})
export class Sucursales{

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string
    @ManyToMany(()=>User,(user) => user.sucursales)
    users : User[]
    
    @ManyToOne(() => provincia, (provincia) => provincia.sucursales)
    provincia : provincia

}