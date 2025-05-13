import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id_cliente: number;

  @Column({ nullable: true })
  cedula_cliente: string;

  @Column()
  nombre_cliente: string;

  @Column({ nullable: true })
  direccion_cliente: string;

  @Column({ nullable: true })
  telefono_cliente: string;

  @Column({ nullable: true })
  correo_cliente: string;

  @Column({ type: 'enum', enum: ['final', 'factura'], default: 'final' })
  tipo_cliente: 'final' | 'factura';
}
