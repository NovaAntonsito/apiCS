import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Persona} from "./persona";

@Entity({})
export class Cuenta{
   @PrimaryGeneratedColumn()
    id: number;
   @Column()
    descripcion : string
    @OneToOne(()=>Persona,(per) =>per.cuenta)
    @JoinColumn({name : "per_cuenta_id"})
    persona : Persona


}