import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateCategoriaDto {
  @ApiProperty({ description: 'Nombre de la categoría', example: 'Bebidas Calientes', required: false })
  @IsString()
  @IsOptional()
  nombre_categoria?: string;

  @ApiProperty({ description: 'Descripción de la categoría', example: 'Todas las bebidas que se sirven calientes', required: false })
  @IsString()
  @IsOptional()
  descripcion_categoria?: string;

  @ApiProperty({ description: 'URL de la imagen de la categoría', example: 'https://ejemplo.com/imagen-categoria.jpg', required: false })
  @IsString()
  @IsOptional()
  imagen_categoria?: string;
} 