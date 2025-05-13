
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { Pedido } from './pedido.entity';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Get()
  getAll() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.pedidosService.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<Pedido>) {
    return this.pedidosService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Partial<Pedido>) {
    return this.pedidosService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.pedidosService.delete(id);
  }
}
