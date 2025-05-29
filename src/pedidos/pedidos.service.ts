
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './pedido.entity';

@Injectable()
export class PedidosService {
  constructor(
    //logica de  negocio para evitar el tipeo mal de los datos que se ingrese
    @InjectRepository(Pedido)
    private pedidosRepository: Repository<Pedido>,
  ) {}

  findAll() {
    return this.pedidosRepository.find();
  }

  findOne(id: number) {
    return this.pedidosRepository.findOne({ where: { id_pedido: id } });
  }

  create(data: Partial<Pedido>) {
    const nuevoPedido = this.pedidosRepository.create(data);
    return this.pedidosRepository.save(nuevoPedido);
  }

  update(id: number, data: Partial<Pedido>) {
    return this.pedidosRepository.update(id, data);
  }

  delete(id: number) {
    return this.pedidosRepository.delete(id);
  }
}
