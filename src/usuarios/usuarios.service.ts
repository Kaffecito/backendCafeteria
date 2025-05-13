import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  findAll() {
    return this.usuarioRepo.find();
  }

  findOne(id: number) {
    return this.usuarioRepo.findOne({ where: { id_usuario: id } });
  }

  create(data: Partial<Usuario>) {
    const nuevo = this.usuarioRepo.create(data);
    return this.usuarioRepo.save(nuevo);
  }

  update(id: number, data: Partial<Usuario>) {
    return this.usuarioRepo.update(id, data);
  }

  delete(id: number) {
    return this.usuarioRepo.delete(id);
  }

  
  async findOneByCedula(cedula: string): Promise<any> {
   
    return null;
  }
}