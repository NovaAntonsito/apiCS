import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity({name: 'Roles'})
export class Roles{
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    rol : string
}