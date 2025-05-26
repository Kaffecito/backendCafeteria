import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetallePedido } from './detalle-pedido.entity';


@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectRepository(DetallePedido)
    private detalleRepo: Repository<DetallePedido>,
  ) {}

  crear(detalle: Partial<DetallePedido>) {
    return this.detalleRepo.save(detalle);
  }

  listarTodos() {
    return this.detalleRepo.find();
  }

  buscarPorId(id: number) {
    return this.detalleRepo.findOneBy({ id_detalle: id });
  }

  actualizar(id: number, datos: Partial<DetallePedido>) {
    return this.detalleRepo.update(id, datos);
  }

  eliminar(id: number) {
    return this.detalleRepo.delete(id);
  }
}
