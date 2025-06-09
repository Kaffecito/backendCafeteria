import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class CreateDetallePedidoDto {
  @ApiProperty({ description: 'ID del pedido al que pertenece este detalle', example: 1, required: false })
  @IsNumber()
  @IsOptional()
  id_pedido?: number;

  @ApiProperty({ description: 'ID del producto', example: 1 })
  @IsNumber()
  id_producto: number;

  @ApiProperty({ description: 'Cantidad del producto', example: 1 })
  @IsNumber()
  @Min(1)
  cantidad_producto: number;

  @ApiProperty({ description: 'Precio unitario del producto al momento de la venta', example: 2.50, required: false })
  @IsNumber()
  @IsOptional()
  precio_unitario_producto?: number;

  @ApiProperty({ description: 'Nota o comentario sobre el producto', required: false })
  @IsString()
  @IsOptional()
  nota_producto?: string;
} 