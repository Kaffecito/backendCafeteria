import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn()
  id_pago: number;

  @Column()
  id_pedido: number;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column()
  metodo_pago: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_pago: Date;
}
