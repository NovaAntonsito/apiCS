import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { tipoPermiso } from './Enums/tipoPermisos';

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
}
