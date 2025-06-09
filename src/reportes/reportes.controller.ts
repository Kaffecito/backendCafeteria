import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ReportesService } from './reportes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolUsuario } from '../usuarios/usuario.entity';
import { ProductoVendido } from './interfaces/producto-vendido.interface';

@ApiTags('reportes')
@Controller('reportes')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('ventas')
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Obtener reporte de ventas por período' })
  @ApiQuery({ name: 'fechaInicio', type: String, description: 'Fecha de inicio (YYYY-MM-DD)' })
  @ApiQuery({ name: 'fechaFin', type: String, description: 'Fecha de fin (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, description: 'Reporte de ventas generado exitosamente' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async getVentasPorPeriodo(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
  ) {
    return this.reportesService.getVentasPorPeriodo(
      new Date(fechaInicio),
      new Date(fechaFin),
    );
  }

  @Get('categorias')
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Obtener reporte de ventas por categoría' })
  @ApiQuery({ name: 'fechaInicio', type: String, description: 'Fecha de inicio (YYYY-MM-DD)' })
  @ApiQuery({ name: 'fechaFin', type: String, description: 'Fecha de fin (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, description: 'Reporte por categorías generado exitosamente' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async getVentasPorCategoria(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
  ) {
    return this.reportesService.getVentasPorCategoria(
      new Date(fechaInicio),
      new Date(fechaFin),
    );
  }

  @Get('meseros')
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Obtener reporte de desempeño de meseros' })
  @ApiQuery({ name: 'fechaInicio', type: String, description: 'Fecha de inicio (YYYY-MM-DD)' })
  @ApiQuery({ name: 'fechaFin', type: String, description: 'Fecha de fin (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, description: 'Reporte de desempeño de meseros generado exitosamente' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async getDesempenoMeseros(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
  ) {
    return this.reportesService.getDesempenoMeseros(
      new Date(fechaInicio),
      new Date(fechaFin),
    );
  }

  @Get('productos-mas-vendidos')
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Obtener reporte de productos más vendidos' })
  @ApiQuery({ name: 'fechaInicio', type: String, description: 'Fecha de inicio (YYYY-MM-DD)' })
  @ApiQuery({ name: 'fechaFin', type: String, description: 'Fecha de fin (YYYY-MM-DD)' })
  @ApiQuery({ name: 'limite', type: Number, description: 'Límite de productos a mostrar', required: false })
  @ApiResponse({ status: 200, description: 'Reporte de productos más vendidos generado exitosamente' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async getProductosMasVendidos(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
    @Query('limite') limite?: number,
  ): Promise<ProductoVendido[]> {
    return this.reportesService.getProductosMasVendidos(
      new Date(fechaInicio),
      new Date(fechaFin),
      limite,
    );
  }
}
