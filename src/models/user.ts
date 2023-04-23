import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, ManyToMany, JoinTable} from 'typeorm'
import { Sucursales } from './sucursal';

@Entity({name: "Usuario"})
export class User{
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    username: string;
    @Column()
    email : string;
    @Column({nullable : false})
    password : string;
    @Column({nullable: true})
    active : boolean;
    
    @ManyToMany(()=>Sucursales,(sucursales)=> sucursales.users)
    @JoinTable()
    sucursales : Sucursales[]

}