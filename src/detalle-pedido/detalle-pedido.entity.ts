import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min, IsOptional } from 'class-validator';
import { Pedido } from '../pedidos/pedido.entity';
import { Producto } from '../productos/producto.entity';

@Entity('detalles_pedido')
export class DetallePedido {
  //creacion de tabla detalle-pedido
  @ApiProperty({ description: 'ID único del detalle de pedido' })
  @PrimaryGeneratedColumn()
  id_detalle_pedido: number;

  @ApiProperty({ description: 'ID del pedido al que pertenece' })
  @Column()
  @IsNumber()
  id_pedido: number;

  @ApiProperty({ description: 'ID del producto' })
  @Column()
  @IsNumber()
  id_producto: number;

  @ApiProperty({ description: 'Cantidad del producto', example: 2, minimum: 1 })
  @Column('int')
  @IsNumber()
  @Min(1)
  cantidad_producto: number;

  @ApiProperty({ description: 'Precio unitario del producto al momento de la venta', example: 2.50 })
  @Column('decimal', { precision: 10, scale: 2 })
  @IsNumber()
  precio_unitario_producto: number;

  @ApiProperty({ description: 'Nota o comentario sobre el producto', required: false })
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  nota_producto?: string;

  @ManyToOne(() => Pedido, pedido => pedido.detalles_pedido)
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;
}
