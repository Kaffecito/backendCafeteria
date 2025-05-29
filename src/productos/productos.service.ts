import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    //logica de negocio para evitar errores
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
  ) {}

  findAll() {
    return this.productosRepository.find();
  }

  findOne(id: number) {
    return this.productosRepository.findOne({ where: { id_producto: id } });
  }

  create(data: Partial<Producto>) {
    const nuevoProducto = this.productosRepository.create(data);
    return this.productosRepository.save(nuevoProducto);
  }

  update(id: number, data: Partial<Producto>) {
    return this.productosRepository.update(id, data);
  }

  delete(id: number) {
    return this.productosRepository.delete(id);
  }
}
