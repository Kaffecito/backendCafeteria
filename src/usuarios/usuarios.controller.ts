import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolUsuario } from './usuario.entity';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('super-admin')
  @ApiOperation({ 
    summary: 'Crear super admin inicial',
    description: 'Crea el super admin inicial del sistema. Este endpoint solo puede ser usado una vez durante la instalación inicial. Las credenciales deben ser guardadas de forma segura por el equipo de soporte.'
  })
  @ApiBody({
    type: CreateUsuarioDto,
    description: 'Datos del super admin',
    examples: {
      superAdmin: {
        summary: 'Super Admin',
        value: {
          cedula_usuario: '1234567890',
          nombre_usuario: 'Super',
          apellido_usuario: 'Admin',
          fecha_nacimiento_usuario: '1990-01-01',
          tipo_sangre_usuario: 'O+',
          password_usuario: 'ContraseñaSegura123!',
          estado_usuario: 'activo'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Super admin creado exitosamente',
    schema: {
      example: {
        id_usuario: 1,
        cedula_usuario: '1234567890',
        nombre_usuario: 'Super',
        apellido_usuario: 'Admin',
        fecha_nacimiento_usuario: '1990-01-01',
        tipo_sangre_usuario: 'O+',
        rol_usuario: 'super_admin',
        estado_usuario: 'activo'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 409, description: 'Ya existe un super admin en el sistema' })
  async createSuperAdmin(@Body() createUsuarioDto: CreateUsuarioDto) {
    const existingSuperAdmin = await this.usuariosService['usuarioRepository'].findOne({
      where: { rol_usuario: RolUsuario.SUPER_ADMIN }
    });
    if (existingSuperAdmin) {
      throw new ConflictException('Ya existe un super admin en el sistema');
    }
    return this.usuariosService.createSuperAdmin(createUsuarioDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async findAll() {
    return this.usuariosService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('cedula/:cedula')
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('cedula/:cedula')
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}