import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('clientes')
export class Cliente {
  @ApiProperty({ description: 'ID único del cliente' })
  @PrimaryGeneratedColumn()
  id_cliente: number;

  @ApiProperty({ description: 'Cédula del cliente', required: false })
  @Column({ nullable: true })
  cedula_cliente: string;

  @ApiProperty({ description: 'Nombre del cliente' })
  @Column()
  nombre_cliente: string;

  @ApiProperty({ description: 'Dirección del cliente', required: false })
  @Column({ nullable: true })
  direccion_cliente: string;

  @ApiProperty({ description: 'Teléfono del cliente', required: false })
  @Column({ nullable: true })
  telefono_cliente: string;

  @ApiProperty({ description: 'Correo electrónico del cliente', required: false })
  @Column({ nullable: true })
  correo_cliente: string;

  @ApiProperty({ description: 'Tipo de cliente', enum: ['final', 'factura'], default: 'final' })
  @Column({ type: 'enum', enum: ['final', 'factura'], default: 'final' })
  tipo_cliente: 'final' | 'factura';
}
