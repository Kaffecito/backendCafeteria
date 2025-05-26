
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  cedula_usuario: string;

  @Column()
  nombre_usuario: string;

  @Column()
  apellido_usuario: string;

  @Column({ type: 'date' })
  fecha_nacimiento_usuario: Date;

  @Column()
  tipo_sangre_usuario: string;

  @Column()
  rol_usuario: string; 

  @Column()
  password_usuario: string;

  @Column({ default: true })
  estado_usuario: boolean;
}
