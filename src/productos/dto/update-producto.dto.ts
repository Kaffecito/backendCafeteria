import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, Min, IsOptional } from 'class-validator';

export class UpdateProductoDto {
  @ApiProperty({ description: 'Nombre del producto', example: 'Café Americano', required: false })
  @IsString()
  @IsOptional()
  nombre_producto?: string;

  @ApiProperty({ description: 'Descripción del producto', example: 'Café negro con agua caliente', required: false })
  @IsString()
  @IsOptional()
  descripcion_producto?: string;

  @ApiProperty({ description: 'Precio del producto', example: 2.50, minimum: 0, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  precio_producto?: number;

  @ApiProperty({ description: 'Cantidad en stock', example: 100, minimum: 0, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  stock_producto?: number;

  @ApiProperty({ description: 'ID de la categoría', example: 1, required: false })
  @IsNumber()
  @IsOptional()
  id_categoria?: number;

  @ApiProperty({ description: 'Estado del producto', required: false })
  @IsBoolean()
  @IsOptional()
  estado_producto?: boolean;

  @ApiProperty({ description: 'URL de la imagen del producto', required: false })
  @IsString()
  @IsOptional()
  imagen_url?: string;
} 