import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEnum, IsNotEmpty, IsBoolean } from 'class-validator';
import { Pedido } from '../pedidos/pedido.entity';

export enum MetodoPago {
  EFECTIVO = 'efectivo',
  TARJETA = 'tarjeta',
  TRANSFERENCIA = 'transferencia'
}

@Entity('pagos')
export class Pago {
  @ApiProperty({ description: 'ID único del pago' })
  @PrimaryGeneratedColumn()
  id_pago: number;

  @ApiProperty({ description: 'ID del pedido asociado' })
  @Column()
  @IsNumber()
  @IsNotEmpty()
  id_pedido: number;

  @ApiProperty({ description: 'Monto total pagado' })
  @Column('decimal', { precision: 10, scale: 2 })
  @IsNumber()
  @IsNotEmpty()
  monto_pago: number;

  @ApiProperty({ description: 'Monto recibido del cliente' })
  @Column('decimal', { precision: 10, scale: 2 })
  @IsNumber()
  @IsNotEmpty()
  monto_recibido: number;

  @ApiProperty({ description: 'Monto del vuelto/cambio' })
  @Column('decimal', { precision: 10, scale: 2 })
  @IsNumber()
  vuelto: number;

  @ApiProperty({ description: 'Método de pago', enum: MetodoPago })
  @Column({
    type: 'enum',
    enum: MetodoPago
  })
  @IsEnum(MetodoPago)
  @IsNotEmpty()
  metodo_pago: MetodoPago;

  @ApiProperty({ description: 'Fecha y hora del pago' })
  @CreateDateColumn()
  fecha_pago: Date;

  @ApiProperty({ description: 'Referencia del pago', required: false })
  @Column({ nullable: true })
  @IsString()
  referencia_pago?: string;

  @ApiProperty({ description: 'Indica si el cliente requirió factura' })
  @Column({ default: false })
  @IsBoolean()
  requiere_factura: boolean;

  @ApiProperty({ description: 'Notas adicionales sobre el pago' })
  @Column({ nullable: true })
  @IsString()
  notas_pago?: string;

  @ManyToOne(() => Pedido)
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;
} 