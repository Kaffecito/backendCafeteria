import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolUsuario } from '../usuarios/usuario.entity';
import { EstadoPedido } from './pedido.entity';

@ApiTags('pedidos')
@Controller('pedidos')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  @Roles(RolUsuario.MESERO, RolUsuario.CAJERA)
  @ApiOperation({ summary: 'Crear un nuevo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o stock insuficiente' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async create(@Req() req, @Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto, req.user.sub);
  }

  @Get()
  @Roles(RolUsuario.ADMIN, RolUsuario.MESERO, RolUsuario.CAJERA)
  @ApiOperation({ summary: 'Obtener todos los pedidos o filtrar por usuario/estado' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async findAll(@Req() req) {
    if (req.user.rol === RolUsuario.MESERO) {
      return this.pedidosService.findByUsuario(req.user.id);
    }
    return this.pedidosService.findAll();
  }

  @Get(':id')
  @Roles(RolUsuario.ADMIN, RolUsuario.MESERO, RolUsuario.CAJERA)
  @ApiOperation({ summary: 'Obtener un pedido por ID' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async findOne(@Param('id') id: string) {
    return this.pedidosService.findOne(+id);
  }

  @Put(':id')
  @Roles(RolUsuario.MESERO, RolUsuario.CAJERA)
  @ApiOperation({ summary: 'Actualizar un pedido' })
  @ApiResponse({ status: 200, description: 'Pedido actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o pedido no modificable' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  @ApiResponse({ status: 403, description: 'No autorizado o pedido no modificable en su estado actual' })
  async update(@Req() req, @Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidosService.update(+id, updatePedidoDto, req.user.rol, req.user.id);
  }

  @Delete(':id')
  @Roles(RolUsuario.MESERO, RolUsuario.CAJERA)
  @ApiOperation({ summary: 'Eliminar un pedido' })
  @ApiResponse({ status: 200, description: 'Pedido eliminado exitosamente' })
  @ApiResponse({ status: 400, description: 'Pedido no eliminable' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  @ApiResponse({ status: 403, description: 'No autorizado o pedido no eliminable en su estado actual' })
  async remove(@Req() req, @Param('id') id: string) {
    return this.pedidosService.remove(+id, req.user.rol, req.user.id);
  }

  @Get('usuario/:id')
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Obtener pedidos por usuario' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos del usuario' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async findByUsuario(@Param('id') id: string) {
    return this.pedidosService.findByUsuario(+id);
  }

  @Get('total/:id')
  @Roles(RolUsuario.ADMIN, RolUsuario.MESERO, RolUsuario.CAJERA)
  @ApiOperation({ summary: 'Calcular el total de un pedido' })
  @ApiResponse({ status: 200, description: 'Total del pedido' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async calcularTotal(@Param('id') id: string) {
    return this.pedidosService.calcularTotal(+id);
  }
}
