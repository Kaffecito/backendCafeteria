import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { DetallePedidoService } from './detalle-pedido.service';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolUsuario } from '../usuarios/usuario.entity';

@ApiTags('detalle-pedido')
@Controller('detalle-pedido')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class DetallePedidoController {
  constructor(private readonly detallePedidoService: DetallePedidoService) {}

  @Post()
  @Roles(RolUsuario.MESERO)
  @ApiOperation({ summary: 'Crear un nuevo detalle de pedido' })
  @ApiResponse({ status: 201, description: 'Detalle de pedido creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async create(@Body() createDetallePedidoDto: CreateDetallePedidoDto) {
    return this.detallePedidoService.create(createDetallePedidoDto);
  }

  @Get()
  @Roles(RolUsuario.ADMIN, RolUsuario.MESERO)
  @ApiOperation({ summary: 'Obtener todos los detalles de pedido' })
  @ApiResponse({ status: 200, description: 'Lista de detalles de pedido' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async findAll() {
    return this.detallePedidoService.findAll();
  }

  @Get(':id')
  @Roles(RolUsuario.ADMIN, RolUsuario.MESERO)
  @ApiOperation({ summary: 'Obtener un detalle de pedido por ID' })
  @ApiResponse({ status: 200, description: 'Detalle de pedido encontrado' })
  @ApiResponse({ status: 404, description: 'Detalle de pedido no encontrado' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async findOne(@Param('id') id: string) {
    return this.detallePedidoService.findOne(+id);
  }

  @Get('pedido/:id')
  @Roles(RolUsuario.ADMIN, RolUsuario.MESERO)
  @ApiOperation({ summary: 'Obtener detalles de un pedido específico' })
  @ApiResponse({ status: 200, description: 'Lista de detalles del pedido' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async findByPedido(@Param('id') id: string) {
    return this.detallePedidoService.findByPedido(+id);
  }

  @Delete(':id')
  @Roles(RolUsuario.MESERO)
  @ApiOperation({ summary: 'Eliminar un detalle de pedido' })
  @ApiResponse({ status: 200, description: 'Detalle de pedido eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Detalle de pedido no encontrado' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async remove(@Param('id') id: string) {
    return this.detallePedidoService.remove(+id);
  }
}
