// src/productos/producto.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id_producto: number;

  @Column()
  nombre_producto: string;

  @Column()
  descripcion_producto: string;

  @Column('decimal')
  precio_producto: number;

  @Column()
  categoria_id: number; // Relacionado con el id de la categoría

  @Column()
  stock_producto: number;

  @Column({ default: true })
  estado_producto: boolean;

  @Column({ nullable: true })
imagen_url: string;
}
