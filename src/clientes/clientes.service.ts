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

  //logica para poder ver los clientes y todo tipo de seteo de datos

  async crear(cliente: Partial<Cliente>) {
    // Si no se proporciona tipo_cliente, establecer como 'final'
    if (!cliente.tipo_cliente) {
      cliente.tipo_cliente = 'final';
    }
    return this.clienteRepo.save(cliente);
  }

  async listarTodos() {
    return this.clienteRepo.find();
  }

  async buscarPorId(id: number) {
    return this.clienteRepo.findOneBy({ id_cliente: id });
  }

  async buscarPorCedula(cedula: string) {
    return this.clienteRepo.findOne({
      where: { cedula_cliente: cedula }
    });
  }

  async actualizar(id: number, datos: Partial<Cliente>) {
    await this.clienteRepo.update(id, datos);
    return this.buscarPorId(id);
  }

  async eliminar(id: number) {
    return this.clienteRepo.delete(id);
  }
}
