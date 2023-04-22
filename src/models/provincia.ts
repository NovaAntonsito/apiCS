import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "Provincia"})
export class provincia {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    nombre : string
}