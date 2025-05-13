import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PagoService } from './pagos.service';
import { Pago } from './pagos.entity';


@Controller('pagos')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  @Post()
  crear(@Body() pago: Partial<Pago>) {
    return this.pagoService.crear(pago);
  }

  @Get()
  listar() {
    return this.pagoService.listarTodos();
  }

  @Get(':id')
  obtener(@Param('id') id: number) {
    return this.pagoService.buscarPorId(id);
  }

  @Put(':id')
  actualizar(@Param('id') id: number, @Body() datos: Partial<Pago>) {
    return this.pagoService.actualizar(id, datos);
  }

  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.pagoService.eliminar(id);
  }
}
