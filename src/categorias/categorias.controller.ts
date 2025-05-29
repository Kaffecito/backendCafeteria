
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { Categoria } from './categoria.entity';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}
//proceso crud del modulo categorias obtener, eliminar,buscar ,actualizar
  @Get()
  getAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.categoriasService.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<Categoria>) {
    return this.categoriasService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Partial<Categoria>) {
    return this.categoriasService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.categoriasService.delete(id);
  }
}
