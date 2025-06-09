import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const producto = this.productoRepository.create(createProductoDto);
    return this.productoRepository.save(producto);
  }

  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find({
      relations: ['categoria'],
      where: { estado_producto: true },
    });
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { id_producto: id },
      relations: ['categoria'],
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return producto;
  }

  async findByCategoria(categoriaId: number): Promise<Producto[]> {
    return this.productoRepository.find({
      where: {
        id_categoria: categoriaId,
        estado_producto: true,
      },
      relations: ['categoria'],
    });
  }

  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findOne(id);
    Object.assign(producto, updateProductoDto);
    return this.productoRepository.save(producto);
  }

  async updateImage(id: number, imageFileName: string): Promise<Producto> {
    const producto = await this.findOne(id);
    
    // Si existe una imagen anterior, la eliminamos
    if (producto.imagen_url) {
      const oldImagePath = path.join(__dirname, '../../uploads/productos', producto.imagen_url);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    producto.imagen_url = imageFileName;
    return this.productoRepository.save(producto);
  }

  async remove(id: number): Promise<void> {
    const producto = await this.findOne(id);
    
    // Si tiene imagen, la eliminamos
    if (producto.imagen_url) {
      const imagePath = path.join(__dirname, '../../uploads/productos', producto.imagen_url);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await this.productoRepository.remove(producto);
  }

  async updateStock(id: number, cantidad: number): Promise<Producto> {
    const producto = await this.findOne(id);
    
    if (producto.stock_producto + cantidad < 0) {
      throw new BadRequestException('No hay suficiente stock disponible');
    }

    producto.stock_producto += cantidad;
    return this.productoRepository.save(producto);
  }
}
