import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Producto } from './producto.entity';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  getAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.productosService.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<Producto>) {
    return this.productosService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Partial<Producto>) {
    return this.productosService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productosService.delete(id);
  }
}
