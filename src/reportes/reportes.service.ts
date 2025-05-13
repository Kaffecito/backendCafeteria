import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from 'src/pedidos/pedido.entity';
import { Usuario } from 'src/usuarios/usuario.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,

    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async reporteVentasDiarias(fecha: string) {
    return await this.pedidoRepo
      .createQueryBuilder('pedido')
      .select('DATE(pedido.fecha_hora_pedido)', 'fecha')
      .addSelect('SUM(pedido.total_pedido)', 'total_ventas')
      .where('DATE(pedido.fecha_hora_pedido) = :fecha', { fecha })
      .groupBy('fecha')
      .getRawOne();
  }

  async reportePedidosPorEstado() {
    return await this.pedidoRepo
      .createQueryBuilder('pedido')
      .select('pedido.estado_pedido', 'estado')
      .addSelect('COUNT(*)', 'cantidad')
      .groupBy('estado')
      .getRawMany();
  }

  async reportePersonal() {
    return await this.usuarioRepo.find({ where: { rol_usuario: 'mesero' } });
  }
}
