import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name : "Empresa"})
export class Empresa{
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    nombre : string
}