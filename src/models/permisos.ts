import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm'
import { tipoPermiso } from './Enums/tipoPermisos';
import { Role } from './roles';

@Entity({name: 'Permiso'})
export class permisos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: tipoPermiso,
    default: tipoPermiso.READ_ONLY
  })
  tipoPermiso: tipoPermiso;
  @ManyToOne(() => Role, (Role) => Role.permisos)
  roles : Role
}
