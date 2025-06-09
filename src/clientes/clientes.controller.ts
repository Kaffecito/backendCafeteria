import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { Cliente } from './clientes.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolUsuario } from '../usuarios/usuario.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@ApiTags('clientes')
@Controller('clientes')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ClientesController {
  constructor(private readonly clienteService: ClientesService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Crear un nuevo cliente',
    description: 'Crea un nuevo cliente en el sistema. La cédula es opcional para clientes de tipo "final".'
  })
  @ApiBody({
    type: CreateClienteDto,
    description: 'Datos del cliente a crear',
    examples: {
      clienteFinal: {
        summary: 'Cliente Final',
        value: {
          nombre_cliente: 'Consumidor Final',
          tipo_cliente: 'final'
        }
      },
      clienteFactura: {
        summary: 'Cliente con Factura',
        value: {
          cedula_cliente: '1234567890',
          nombre_cliente: 'Juan Pérez',
          direccion_cliente: 'Av. Principal #123',
          telefono_cliente: '0987654321',
          correo_cliente: 'juan@email.com',
          tipo_cliente: 'factura'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Cliente creado exitosamente',
    type: Cliente,
    schema: {
      example: {
        id_cliente: 1,
        cedula_cliente: '1234567890',
        nombre_cliente: 'Juan Pérez',
        direccion_cliente: 'Av. Principal #123',
        telefono_cliente: '0987654321',
        correo_cliente: 'juan@email.com',
        tipo_cliente: 'factura'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos - Verifique el formato de los campos' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT requerido' })
  @ApiResponse({ status: 403, description: 'Forbidden - No tiene permisos para crear clientes' })
  @Roles(RolUsuario.ADMIN, RolUsuario.CAJERA, RolUsuario.MESERO)
  crear(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.crear(createClienteDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todos los clientes o buscar por cédula',
    description: 'Retorna todos los clientes o busca un cliente específico por su número de cédula'
  })
  @ApiQuery({ 
    name: 'cedula', 
    required: false, 
    description: 'Cédula del cliente a buscar (10 dígitos)',
    example: '1234567890'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de clientes encontrados',
    type: [Cliente],
    schema: {
      example: [{
        id_cliente: 1,
        cedula_cliente: '1234567890',
        nombre_cliente: 'Juan Pérez',
        direccion_cliente: 'Av. Principal #123',
        telefono_cliente: '0987654321',
        correo_cliente: 'juan@email.com',
        tipo_cliente: 'factura'
      }]
    }
  })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT requerido' })
  @ApiResponse({ status: 403, description: 'Forbidden - No tiene permisos para listar clientes' })
  @Roles(RolUsuario.ADMIN, RolUsuario.CAJERA, RolUsuario.MESERO)
  async listar(@Query('cedula') cedula?: string) {
    if (cedula) {
      const cliente = await this.clienteService.buscarPorCedula(cedula);
      return cliente ? [cliente] : [];
    }
    return this.clienteService.listarTodos();
  }

  @Get('cedula/:cedula')
  @ApiOperation({ 
    summary: 'Obtener un cliente por cédula',
    description: 'Busca y retorna un cliente específico por su número de cédula'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Cliente encontrado',
    type: Cliente,
    schema: {
      example: {
        id_cliente: 1,
        cedula_cliente: '1234567890',
        nombre_cliente: 'Juan Pérez',
        direccion_cliente: 'Av. Principal #123',
        telefono_cliente: '0987654321',
        correo_cliente: 'juan@email.com',
        tipo_cliente: 'factura'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado - La cédula especificada no existe' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT requerido' })
  @ApiResponse({ status: 403, description: 'Forbidden - No tiene permisos para buscar clientes' })
  @Roles(RolUsuario.ADMIN, RolUsuario.CAJERA, RolUsuario.MESERO)
  async buscarPorCedula(@Param('cedula') cedula: string) {
    return this.clienteService.buscarPorCedula(cedula);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener un cliente por ID',
    description: 'Busca y retorna un cliente específico por su ID'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Cliente encontrado',
    type: Cliente,
    schema: {
      example: {
        id_cliente: 1,
        cedula_cliente: '1234567890',
        nombre_cliente: 'Juan Pérez',
        direccion_cliente: 'Av. Principal #123',
        telefono_cliente: '0987654321',
        correo_cliente: 'juan@email.com',
        tipo_cliente: 'factura'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado - El ID especificado no existe' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT requerido' })
  @ApiResponse({ status: 403, description: 'Forbidden - No tiene permisos para buscar clientes' })
  @Roles(RolUsuario.ADMIN, RolUsuario.CAJERA, RolUsuario.MESERO)
  obtener(@Param('id') id: number) {
    return this.clienteService.buscarPorId(id);
  }

  @Put(':id')
  @ApiOperation({ 
    summary: 'Actualizar un cliente',
    description: 'Actualiza los datos de un cliente existente por su ID'
  })
  @ApiBody({
    type: UpdateClienteDto,
    description: 'Datos del cliente a actualizar',
    examples: {
      actualizacionParcial: {
        summary: 'Actualización Parcial',
        value: {
          telefono_cliente: '0987654321',
          correo_cliente: 'nuevo@email.com'
        }
      },
      actualizacionCompleta: {
        summary: 'Actualización Completa',
        value: {
          cedula_cliente: '1234567890',
          nombre_cliente: 'Juan Pérez Actualizado',
          direccion_cliente: 'Nueva Dirección #456',
          telefono_cliente: '0987654321',
          correo_cliente: 'nuevo@email.com',
          tipo_cliente: 'factura'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Cliente actualizado exitosamente',
    type: Cliente,
    schema: {
      example: {
        id_cliente: 1,
        cedula_cliente: '1234567890',
        nombre_cliente: 'Juan Pérez Actualizado',
        direccion_cliente: 'Nueva Dirección #456',
        telefono_cliente: '0987654321',
        correo_cliente: 'nuevo@email.com',
        tipo_cliente: 'factura'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado - El ID especificado no existe' })
  @ApiResponse({ status: 400, description: 'Datos inválidos - Verifique el formato de los campos' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT requerido' })
  @ApiResponse({ status: 403, description: 'Forbidden - No tiene permisos para actualizar clientes' })
  @Roles(RolUsuario.ADMIN, RolUsuario.CAJERA)
  actualizar(@Param('id') id: number, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.actualizar(id, updateClienteDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Eliminar un cliente',
    description: 'Elimina un cliente existente por su ID'
  })
  @ApiResponse({ status: 200, description: 'Cliente eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado - El ID especificado no existe' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT requerido' })
  @ApiResponse({ status: 403, description: 'Forbidden - No tiene permisos para eliminar clientes' })
  @Roles(RolUsuario.ADMIN)
  eliminar(@Param('id') id: number) {
    return this.clienteService.eliminar(id);
  }
}
