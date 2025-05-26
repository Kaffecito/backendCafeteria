import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  getAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.usuariosService.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<Usuario>) {
    return this.usuariosService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Partial<Usuario>) {
    return this.usuariosService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usuariosService.delete(id);
  }
}