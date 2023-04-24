import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'


@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rol: string;

 
  //TODO Relacion con Permisos-Roles OneToMany
}
