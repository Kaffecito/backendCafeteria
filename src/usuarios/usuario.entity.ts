import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsDate, Length } from 'class-validator';
import { Pedido } from '../pedidos/pedido.entity';

export enum RolUsuario {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MESERO = 'mesero',
  CAJERO = 'cajero',
  CAJERA = 'cajera'
}

export enum EstadoUsuario {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo'
}

@Entity('usuarios')
export class Usuario {
  @ApiProperty({ description: 'ID único del usuario' })
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @ApiProperty({ description: 'Cédula del usuario', example: '1234567890' })
  @Column({ unique: true })
  @IsString()
  @Length(10, 10)
  cedula_usuario: string;

  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan' })
  @Column()
  @IsString()
  nombre_usuario: string;

  @ApiProperty({ description: 'Apellido del usuario', example: 'Pérez' })
  @Column()
  @IsString()
  apellido_usuario: string;

  @ApiProperty({ description: 'Fecha de nacimiento del usuario' })
  @Column('date')
  @IsDate()
  fecha_nacimiento_usuario: Date;

  @ApiProperty({ description: 'Tipo de sangre del usuario', example: 'O+' })
  @Column()
  @IsString()
  tipo_sangre_usuario: string;

  @ApiProperty({ description: 'Contraseña del usuario' })
  @Column()
  @IsString()
  password_usuario: string;

  @ApiProperty({ description: 'Rol del usuario', enum: RolUsuario })
  @Column({
    type: 'enum',
    enum: RolUsuario,
    default: RolUsuario.MESERO
  })
  @IsEnum(RolUsuario)
  rol_usuario: RolUsuario;

  @ApiProperty({ description: 'Estado del usuario', enum: EstadoUsuario })
  @Column({
    type: 'enum',
    enum: EstadoUsuario,
    default: EstadoUsuario.ACTIVO
  })
  @IsEnum(EstadoUsuario)
  estado_usuario: EstadoUsuario;

  @OneToMany(() => Pedido, pedido => pedido.usuario)
  pedidos: Pedido[];
}
