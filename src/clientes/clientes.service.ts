import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './clientes.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
  ) {}

  async crear(cliente: Partial<Cliente>) {
    return this.clienteRepo.save(cliente);
  }

  async listarTodos() {
    return this.clienteRepo.find();
  }

  async buscarPorId(id: number) {
    return this.clienteRepo.findOneBy({ id_cliente: id });
  }

  async actualizar(id: number, datos: Partial<Cliente>) {
    await this.clienteRepo.update(id, datos);
    return this.buscarPorId(id);
  }

  async eliminar(id: number) {
    return this.clienteRepo.delete(id);
  }
}
