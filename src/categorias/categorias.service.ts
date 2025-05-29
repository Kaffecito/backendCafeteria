
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    //logica de negocio y transformaciones de datos para el envio hacia la BD
    @InjectRepository(Categoria)
    private categoriasRepository: Repository<Categoria>,
  ) {}

  findAll() {
    return this.categoriasRepository.find();
  }

  findOne(id: number) {
    return this.categoriasRepository.findOne({ where: { id_categoria: id } });
  }

  create(data: Partial<Categoria>) {
    const nuevaCategoria = this.categoriasRepository.create(data);
    return this.categoriasRepository.save(nuevaCategoria);
  }

  update(id: number, data: Partial<Categoria>) {
    return this.categoriasRepository.update(id, data);
  }

  delete(id: number) {
    return this.categoriasRepository.delete(id);
  }
}
