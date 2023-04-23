import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from 'typeorm'
import { permisos } from './permisos';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rol: string;

 //TODO Relacion con Permisos-Roles OneToMany
}
