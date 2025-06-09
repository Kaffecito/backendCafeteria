import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsEnum, Length, IsNotEmpty } from 'class-validator';
import { RolUsuario, EstadoUsuario } from '../usuario.entity';
import { Type } from 'class-transformer';

export class CreateUsuarioDto {
  @ApiProperty({ description: 'Cédula del usuario', example: '1234567890' })
  @IsString()
  @Length(10, 10, { message: 'La cédula debe tener 10 dígitos' })
  @IsNotEmpty()
  cedula_usuario: string;

  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan' })
  @IsString()
  @IsNotEmpty()
  nombre_usuario: string;

  @ApiProperty({ description: 'Apellido del usuario', example: 'Pérez' })
  @IsString()
  @IsNotEmpty()
  apellido_usuario: string;

  @ApiProperty({ description: 'Fecha de nacimiento del usuario', example: '1990-01-01' })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  fecha_nacimiento_usuario: Date;

  @ApiProperty({ description: 'Tipo de sangre del usuario', example: 'O+' })
  @IsString()
  @IsNotEmpty()
  tipo_sangre_usuario: string;

  @ApiProperty({ description: 'Contraseña del usuario' })
  @IsString()
  @IsNotEmpty()
  password_usuario: string;

  @ApiProperty({ description: 'Rol del usuario', enum: RolUsuario, example: 'mesero' })
  @IsEnum(RolUsuario)
  @IsNotEmpty()
  rol_usuario: RolUsuario;

  @ApiProperty({ description: 'Estado del usuario', enum: EstadoUsuario, example: 'activo' })
  @IsEnum(EstadoUsuario)
  @IsNotEmpty()
  estado_usuario: EstadoUsuario;
} 