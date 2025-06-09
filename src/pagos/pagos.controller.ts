import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CrearPagoDto } from './dto/crear-pago.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { PagoResponseDto } from './dto/pago-response.dto';

@ApiTags('pagos')
@Controller('pagos')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post(':idPedido')
  @Roles(Role.ADMIN, Role.CAJERO)
  @ApiOperation({ 
    summary: 'Procesar un nuevo pago para un pedido',
    description: 'Registra el pago de un pedido. Para pagos en efectivo, calcula automáticamente el vuelto basado en el monto recibido.'
  })
  @ApiResponse({
    status: 201,
    description: 'El pago ha sido procesado exitosamente',
    type: PagoResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos inválidos o monto incorrecto',
    schema: {
      example: {
        message: [
          'El monto recibido debe ser mayor o igual al monto a pagar',
          'El monto del pago no coincide con el total del pedido'
        ],
        error: 'Bad Request',
        statusCode: 400
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  async procesarPago(
    @Param('idPedido') idPedido: number,
    @Body() crearPagoDto: CrearPagoDto,
  ) {
    return this.pagosService.procesarPago(idPedido, crearPagoDto);
  }

  @Get('pedido/:idPedido')
  @Roles(Role.ADMIN, Role.CAJERO)
  @ApiOperation({ summary: 'Obtener pagos de un pedido específico' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pagos del pedido',
    type: [PagoResponseDto]
  })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  async getPagosPorPedido(@Param('idPedido') idPedido: number) {
    return this.pagosService.findByPedido(idPedido);
  }
}
