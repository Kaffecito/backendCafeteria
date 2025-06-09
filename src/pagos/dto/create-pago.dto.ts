import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsEnum, IsString, IsOptional, IsNotEmpty, IsBoolean, Min } from 'class-validator';
import { MetodoPago } from '../pago.entity';

export class CreatePagoDto {
  @ApiProperty({ description: 'ID del pedido asociado' })
  @IsNumber()
  @IsNotEmpty()
  id_pedido: number;

  @ApiProperty({ description: 'Monto total a pagar (total del pedido)', example: 12.50 })
  @IsNumber()
  @IsNotEmpty()
  monto_pago: number;

  @ApiProperty({ description: 'Monto recibido del cliente', example: 20.00 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  monto_recibido: number;

  @ApiProperty({ description: 'Método de pago', enum: MetodoPago, example: 'efectivo' })
  @IsEnum(MetodoPago)
  @IsNotEmpty()
  metodo_pago: MetodoPago;

  @ApiProperty({ 
    description: 'Referencia del pago (número de transacción, últimos dígitos de tarjeta, etc.)', 
    required: false,
    example: '4512'
  })
  @IsString()
  @IsOptional()
  referencia_pago?: string;

  @ApiProperty({ 
    description: 'Indica si el cliente requiere factura', 
    example: true,
    default: false
  })
  @IsBoolean()
  @IsOptional()
  requiere_factura?: boolean;

  @ApiProperty({ 
    description: 'Notas adicionales sobre el pago', 
    required: false,
    example: 'Cliente pidió factura con datos específicos'
  })
  @IsString()
  @IsOptional()
  notas_pago?: string;
} 