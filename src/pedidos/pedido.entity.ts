
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Producto } from '../productos/producto.entity';
import { Usuario } from 'src/usuarios/usuario.entity';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id_pedido: number;

  @ManyToOne(() => Usuario, usuario => usuario.id_usuario)
  usuario_id: Usuario;

  @ManyToOne(() => Producto, producto => producto.id_producto)
  producto_id: Producto;

  @Column('decimal')
  cantidad_pedido: number;

  @Column('decimal')
  total_pedido: number;

  @Column({ default: 'pendiente' })
  estado_pedido: string;
}
