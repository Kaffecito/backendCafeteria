// src/productos/producto.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, Min, IsNotEmpty } from 'class-validator';
import { Categoria } from '../categorias/categoria.entity';
import { DetallePedido } from '../detalle-pedido/detalle-pedido.entity';

@Entity('productos')
export class Producto {
  @ApiProperty({ description: 'ID único del producto' })
  @PrimaryGeneratedColumn()
  id_producto: number;
  //relacion de la tabla producto con categorias

  @ApiProperty({ description: 'Nombre del producto', example: 'Café Americano' })
  @Column()
  @IsString()
  @IsNotEmpty()
  nombre_producto: string;

  @ApiProperty({ description: 'Descripción del producto', example: 'Café negro con agua caliente' })
  @Column('text')
  @IsString()
  descripcion_producto: string;

  @ApiProperty({ description: 'Precio del producto', example: 2.50, minimum: 0 })
  @Column('decimal', { precision: 10, scale: 2 })
  @IsNumber()
  @Min(0)
  precio_producto: number;

  @ApiProperty({ description: 'Cantidad en stock', example: 100, minimum: 0 })
  @Column('int', { default: 0 })
  @IsNumber()
  @Min(0)
  stock_producto: number;

  @ApiProperty({ description: 'ID de la categoría a la que pertenece el producto' })
  @Column()
  @IsNumber()
  id_categoria: number;

  @ApiProperty({ description: 'Estado del producto (activo/inactivo)', default: true })
  @Column({ default: true })
  @IsBoolean()
  estado_producto: boolean;

  @ApiProperty({ description: 'URL de la imagen del producto' })
  @Column({ nullable: true })
  @IsString()
  imagen_url: string;

  @ManyToOne(() => Categoria, categoria => categoria.productos)
  categoria: Categoria;

  @OneToMany(() => DetallePedido, detallePedido => detallePedido.producto)
  detallesPedido: DetallePedido[];
}
