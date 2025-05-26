import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('detalle_pedido')
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id_detalle: number;

  @Column()
  id_pedido: number;

  @Column()
  id_producto: number;

  @Column()
  cantidad: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precio_unitario: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;
}
