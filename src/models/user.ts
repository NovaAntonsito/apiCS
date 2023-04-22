import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm'
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
    @OneToOne(() => Sucursales)
    @JoinColumn()
    sucursal : Sucursales
}