import { Controller, Get, Query } from '@nestjs/common';
import { ReportesService } from './reportes.service';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}
//reportes de ventas principales 
  @Get('ventas-diarias')
  ventasDiarias(@Query('fecha') fecha: string) {
    return this.reportesService.reporteVentasDiarias(fecha);
  }

  @Get('estado-pedidos')
  estadoPedidos() {
    return this.reportesService.reportePedidosPorEstado();
  }

  @Get('personal')
  reportePersonal() {
    return this.reportesService.reportePersonal();
  }
}
