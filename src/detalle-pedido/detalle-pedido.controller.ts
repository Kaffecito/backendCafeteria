import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DetallePedidoService } from './detalle-pedido.service';
import { DetallePedido } from './detalle-pedido.entity';


@Controller('detalle-pedido')
export class DetallePedidoController {
  constructor(private readonly detalleService: DetallePedidoService) {}

  @Post()
  crear(@Body() detalle: Partial<DetallePedido>) {
    return this.detalleService.crear(detalle);
  }

  @Get()
  listar() {
    return this.detalleService.listarTodos();
  }

  @Get(':id')
  obtener(@Param('id') id: number) {
    return this.detalleService.buscarPorId(id);
  }

  @Put(':id')
  actualizar(@Param('id') id: number, @Body() datos: Partial<DetallePedido>) {
    return this.detalleService.actualizar(id, datos);
  }

  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.detalleService.eliminar(id);
  }
}
