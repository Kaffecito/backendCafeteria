import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsNotEmpty } from 'class-validator';
import { Usuario } from '../usuarios/usuario.entity';
import { DetallePedido } from '../detalle-pedido/detalle-pedido.entity';

export enum EstadoPedido {
  PENDIENTE = 'pendiente',
  EN_PROCESO = 'en_proceso',
  COMPLETADO = 'completado',
  CANCELADO = 'cancelado'
}

@Entity('pedidos')
export class Pedido {
  @ApiProperty({ description: 'ID único del pedido' })
  @PrimaryGeneratedColumn()
  id_pedido: number;

  @ApiProperty({ description: 'ID del usuario que realiza el pedido' })
  @Column()
  @IsNumber()
  @IsNotEmpty()
  id_usuario: number;

  @ApiProperty({ description: 'Fecha y hora del pedido' })
  @CreateDateColumn()
  fecha_pedido: Date;

  @ApiProperty({ description: 'Estado del pedido', enum: EstadoPedido })
  @Column({
    type: 'enum',
    enum: EstadoPedido,
    default: EstadoPedido.PENDIENTE
  })
  @IsEnum(EstadoPedido)
  estado_pedido: EstadoPedido;

  @ApiProperty({ description: 'Total del pedido' })
  @Column('decimal', { precision: 10, scale: 2 })
  @IsNumber()
  total_pedido: number;

  @ApiProperty({ description: 'Notas adicionales del pedido', required: false })
  @Column({ nullable: true })
  notas_pedido?: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @OneToMany(() => DetallePedido, detallePedido => detallePedido.pedido)
  detalles_pedido: DetallePedido[];
}
