import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { tipoPermiso } from './Enums/tipoPermisos';

@Entity({name:'Permisos'})
export class permisos{
    @PrimaryGeneratedColumn()
    id : number;
    @Column({type: 'varchar'})
    tipoPermiso : tipoPermiso
}