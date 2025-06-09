import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsNotEmpty } from 'class-validator';

export class CreateProductoDto {
  @ApiProperty({ description: 'Nombre del producto', example: 'Café Americano' })
  @IsString()
  @IsNotEmpty()
  nombre_producto: string;

  @ApiProperty({ description: 'Descripción del producto', example: 'Café negro con agua caliente' })
  @IsString()
  @IsNotEmpty()
  descripcion_producto: string;

  @ApiProperty({ description: 'Precio del producto', example: 2.50, minimum: 0 })
  @IsNumber()
  @Min(0)
  precio_producto: number;

  @ApiProperty({ description: 'Cantidad inicial en stock', example: 100, minimum: 0 })
  @IsNumber()
  @Min(0)
  stock_producto: number;

  @ApiProperty({ description: 'ID de la categoría', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  id_categoria: number;
} 