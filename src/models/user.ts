import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany} from 'typeorm'
import { Sucursales } from './sucursal';
import { Role } from './roles';

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

    @OneToMany(() => Role, (Role) => Role.usuario)
    @JoinTable()
    roles : Role[]
    
    @ManyToMany(()=>Sucursales,(sucursales)=> sucursales.usuarios)
    @JoinTable()
    sucursales : Sucursales[]

}