import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsOptional, IsEnum } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({ description: 'Cédula del cliente', example: '1234567890', required: false })
  @IsString()
  @Length(10, 10, { message: 'La cédula debe tener 10 dígitos' })
  @IsOptional()
  cedula_cliente?: string;

  @ApiProperty({ description: 'Nombre del cliente', example: 'Consumidor Final' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  nombre_cliente: string;

  @ApiProperty({ description: 'Dirección del cliente', example: 'Av. Principal #123', required: false })
  @IsString()
  @IsOptional()
  direccion_cliente?: string;

  @ApiProperty({ description: 'Teléfono del cliente', example: '0987654321', required: false })
  @IsString()
  @Length(10, 15)
  @IsOptional()
  telefono_cliente?: string;

  @ApiProperty({ description: 'Correo electrónico del cliente', example: 'juan@email.com', required: false })
  @IsString()
  @IsOptional()
  correo_cliente?: string;

  @ApiProperty({ 
    description: 'Tipo de cliente', 
    enum: ['final', 'factura'], 
    example: 'final',
    default: 'final'
  })
  @IsEnum(['final', 'factura'])
  @IsOptional()
  tipo_cliente?: 'final' | 'factura' = 'final';
} 