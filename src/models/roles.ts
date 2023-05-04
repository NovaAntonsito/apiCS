import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinTable} from 'typeorm'
import { permisos } from './permisos';
import { User } from './user';


@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rol: string;

  @ManyToOne(()=> User, (User) => User.roles)
  users : User;

  @OneToMany(()=>permisos,(permisos) => permisos.roles)
  @JoinTable()
  permisos : permisos[]

}
