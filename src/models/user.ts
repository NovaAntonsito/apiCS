import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity({name: "Usuario"})
export class User{
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    username: string;
    @Column()
    password : string;
    @Column()
    active : boolean;
}