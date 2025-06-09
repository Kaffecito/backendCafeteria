import { ApiProperty } from '@nestjs/swagger';
import { MetodoPago } from '../pago.entity';

export class DetallesPagoDto {
  @ApiProperty({ description: 'Total del pedido', example: 12.50 })
  total_pedido: number;

  @ApiProperty({ description: 'Monto recibido del cliente', example: 20.00 })
  monto_recibido: number;

  @ApiProperty({ description: 'Vuelto calculado', example: 7.50 })
  vuelto: number;

  @ApiProperty({ description: 'Indica si el cliente requirió factura', example: false })
  requiere_factura: boolean;
}

export class PagoResponseDto {
  @ApiProperty({ description: 'ID único del pago' })
  id_pago: number;

  @ApiProperty({ description: 'ID del pedido asociado' })
  id_pedido: number;

  @ApiProperty({ description: 'Monto total pagado', example: 12.50 })
  monto_pago: number;

  @ApiProperty({ description: 'Monto recibido del cliente', example: 20.00 })
  monto_recibido: number;

  @ApiProperty({ description: 'Vuelto calculado', example: 7.50 })
  vuelto: number;

  @ApiProperty({ description: 'Método de pago utilizado', enum: MetodoPago, example: 'efectivo' })
  metodo_pago: MetodoPago;

  @ApiProperty({ description: 'Fecha y hora del pago' })
  fecha_pago: Date;

  @ApiProperty({ description: 'Referencia del pago (número de transacción, últimos dígitos de tarjeta, etc.)', required: false })
  referencia_pago?: string;

  @ApiProperty({ description: 'Indica si el cliente requirió factura', example: false })
  requiere_factura: boolean;

  @ApiProperty({ description: 'Notas adicionales sobre el pago', required: false })
  notas_pago?: string;

  @ApiProperty({ description: 'Detalles adicionales del pago', type: DetallesPagoDto })
  detalles_pago: DetallesPagoDto;
} 