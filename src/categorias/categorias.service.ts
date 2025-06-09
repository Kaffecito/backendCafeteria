import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    //logica de negocio y transformaciones de datos para el envio hacia la BD
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    // Verificar si ya existe una categoría con el mismo nombre
    const existingCategoria = await this.categoriaRepository.findOne({
      where: { nombre_categoria: createCategoriaDto.nombre_categoria },
    });

    if (existingCategoria) {
      throw new ConflictException('Ya existe una categoría con este nombre');
    }

    const categoria = this.categoriaRepository.create(createCategoriaDto);
    return this.categoriaRepository.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find({
      relations: ['productos'],
    });
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id_categoria: id },
      relations: ['productos'],
    });

    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    return categoria;
  }

  async findProductos(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id_categoria: id },
      relations: ['productos'],
    });

    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.findOne(id);

    if (updateCategoriaDto.nombre_categoria) {
      const existingCategoria = await this.categoriaRepository.findOne({
        where: { nombre_categoria: updateCategoriaDto.nombre_categoria },
      });

      if (existingCategoria && existingCategoria.id_categoria !== id) {
        throw new ConflictException('Ya existe una categoría con este nombre');
      }
    }

    Object.assign(categoria, updateCategoriaDto);
    return this.categoriaRepository.save(categoria);
  }

  async remove(id: number): Promise<void> {
    const categoria = await this.findOne(id);

    if (categoria.productos && categoria.productos.length > 0) {
      throw new ConflictException('No se puede eliminar una categoría que tiene productos asociados');
    }

    await this.categoriaRepository.remove(categoria);
  }
}
