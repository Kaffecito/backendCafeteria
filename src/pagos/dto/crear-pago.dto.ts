import { IsNumber, IsEnum, IsString, IsBoolean, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MetodoPago } from '../pago.entity';

export class CrearPagoDto {
  @ApiProperty({ description: 'Monto recibido del cliente', example: 20.00 })
  @IsNumber()
  @Min(0)
  monto_recibido: number;

  @ApiProperty({ description: 'Método de pago', enum: MetodoPago, example: 'efectivo' })
  @IsEnum(MetodoPago)
  metodo_pago: MetodoPago;

  @ApiProperty({ description: 'Referencia del pago (número de transacción, últimos dígitos de tarjeta, etc.)', required: false })
  @IsString()
  @IsOptional()
  referencia_pago?: string;

  @ApiProperty({ description: 'Indica si el cliente requiere factura', example: false })
  @IsBoolean()
  @IsOptional()
  requiere_factura?: boolean;

  @ApiProperty({ description: 'Notas adicionales sobre el pago', required: false })
  @IsString()
  @IsOptional()
  notas_pago?: string;
} 