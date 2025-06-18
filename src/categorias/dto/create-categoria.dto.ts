import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({ description: 'Nombre de la categoría', example: 'Bebidas Calientes' })
  @IsString()
  @IsNotEmpty()
  nombre_categoria: string;

  @ApiProperty({ description: 'Descripción de la categoría', example: 'Todas las bebidas que se sirven calientes', required: false })
  @IsString()
  @IsOptional()
  descripcion_categoria?: string;

  @ApiProperty({ description: 'URL de la imagen de la categoría', example: 'https://ejemplo.com/imagen-categoria.jpg', required: false })
  @IsString()
  @IsOptional()
  imagen_categoria?: string;
} 