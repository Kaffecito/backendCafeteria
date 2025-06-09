import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsDate, IsEnum, Length, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { RolUsuario, EstadoUsuario } from '../usuario.entity';
import { Type } from 'class-transformer';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @ApiProperty({ description: 'Cédula del usuario', example: '1234567890', required: false })
  @IsString()
  @Length(10, 10, { message: 'La cédula debe tener 10 dígitos' })
  @IsOptional()
  cedula_usuario?: string;

  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan', required: false })
  @IsString()
  @IsOptional()
  nombre_usuario?: string;

  @ApiProperty({ description: 'Apellido del usuario', example: 'Pérez', required: false })
  @IsString()
  @IsOptional()
  apellido_usuario?: string;

  @ApiProperty({ description: 'Fecha de nacimiento del usuario', example: '1990-01-01', required: false })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  fecha_nacimiento_usuario?: Date;

  @ApiProperty({ description: 'Tipo de sangre del usuario', example: 'O+', required: false })
  @IsString()
  @IsOptional()
  tipo_sangre_usuario?: string;

  @ApiProperty({ description: 'Rol del usuario', enum: RolUsuario, example: 'mesero', required: false })
  @IsEnum(RolUsuario)
  @IsOptional()
  rol_usuario?: RolUsuario;

  @ApiProperty({ description: 'Contraseña del usuario', required: false })
  @IsString()
  @IsOptional()
  password_usuario?: string;

  @ApiProperty({ description: 'Estado del usuario (activo/inactivo)', required: false })
  @IsOptional()
  @IsEnum(EstadoUsuario)
  estado_usuario?: EstadoUsuario;
} 