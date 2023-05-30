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
    @Column({default : null, nullable : true})
    urlImagen : string
    @Column({nullable : true, default: null})
    password : string;
    @Column({default : null, nullable : true})
    active : boolean;

    @Column({default : "Propio"})
    provider : string;

    @Column({unique : true, default : null, nullable : true})
    providerID : string

    @OneToMany(() => Role, (Role) => Role.usuario)
    @JoinTable()
    roles : Role[]
    
    @ManyToMany(()=>Sucursales,(sucursales)=> sucursales.usuarios)
    @JoinTable({name:"usuario_Sucursales"})
    sucursales : Sucursales[]

}