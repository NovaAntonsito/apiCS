import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm'
import { permisos } from './permisos';

@Entity({name: 'Roles'})
export class Roles{
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    rol : string
    @OneToOne(() => permisos)
    @JoinColumn()
    permisos : permisos
}