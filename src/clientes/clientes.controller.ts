import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { Cliente } from './clientes.entity';


@Controller('clientes')
export class ClientesController {
  constructor(private readonly clienteService: ClientesService) {}

  @Post()
  crear(@Body() cliente: Partial<Cliente>) {
    return this.clienteService.crear(cliente);
  }

  @Get()
  listar() {
    return this.clienteService.listarTodos();
  }

  @Get(':id')
  obtener(@Param('id') id: number) {
    return this.clienteService.buscarPorId(id);
  }

  @Put(':id')
  actualizar(@Param('id') id: number, @Body() datos: Partial<Cliente>) {
    return this.clienteService.actualizar(id, datos);
  }

  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.clienteService.eliminar(id);
  }
}
