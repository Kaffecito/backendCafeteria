import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolUsuario } from './usuario.entity';

@ApiTags('usuarios')
@Controller('usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ 
    summary: 'Crear un nuevo usuario',
    description: 'Crea un nuevo usuario (trabajador) en el sistema. Solo administradores pueden crear usuarios.'
  })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT requerido' })
  @ApiResponse({ status: 403, description: 'Forbidden - Solo administradores pueden crear usuarios' })
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async findAll() {
    return this.usuariosService.findAll();
  }

@Get('cedula/:cedula')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RolUsuario.ADMIN)
@ApiOperation({ summary: 'Obtener un usuario por cédula' })
@ApiResponse({ status: 200, description: 'Usuario encontrado' })
@ApiResponse({ status: 404, description: 'Usuario no encontrado' })
@ApiResponse({ status: 403, description: 'No autorizado' })
async findOneByCedula(@Param('cedula') cedula: string) {
  const user = await this.usuariosService.findOneByCedula(cedula);
  if (!user) {
    throw new NotFoundException(`Usuario con cédula ${cedula} no encontrado`);
  }
  return user;
}

 @Patch('cedula/:cedula')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RolUsuario.ADMIN)
@ApiOperation({ summary: 'Actualizar un usuario por cédula' })
@ApiResponse({ status: 200, description: 'Usuario actualizado correctamente' })
@ApiResponse({ status: 404, description: 'Usuario no encontrado' })
@ApiResponse({ status: 403, description: 'No autorizado' })
async updateByCedula(@Param('cedula') cedula: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
  const usuario = await this.usuariosService.updateByCedula(cedula, updateUsuarioDto);
  if (!usuario) {
    throw new NotFoundException(`Usuario con cédula ${cedula} no encontrado`);
  }
  return usuario;
}


  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}