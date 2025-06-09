import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

@Entity('clientes')
export class Cliente {
  @ApiProperty({ description: 'ID único del cliente' })
  @PrimaryGeneratedColumn()
  id_cliente: number;

  @ApiProperty({ description: 'Nombre del cliente' })
  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  nombre_cliente: string;

  @ApiProperty({ description: 'Teléfono del cliente', required: false })
  @Column({ nullable: true })
  @IsString()
  @Length(10, 15)
  telefono_cliente?: string;

  @ApiProperty({ description: 'Dirección del cliente', required: false })
  @Column({ nullable: true })
  @IsString()
  direccion_cliente?: string;
} 