import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, ValidateNested, IsOptional, Min, IsString, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDetallePedidoDto } from '../../detalle-pedido/dto/create-detalle-pedido.dto';
import { CreateClienteDto } from '../../clientes/dto/create-cliente.dto';

export class CreatePedidoDto {
  @ApiProperty({ description: 'ID del usuario que crea el pedido' })
  @IsNumber()
  id_usuario: number;

  @ApiProperty({ 
    description: 'ID del cliente existente. Si no se proporciona, se creará un nuevo cliente con la información en cliente_nuevo', 
    required: false,
    minimum: 0,
    example: 0
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  id_cliente?: number;

  @ApiProperty({ 
    description: 'Información del nuevo cliente. Requerido si no se proporciona id_cliente', 
    required: false,
    type: CreateClienteDto,
    example: {
      nombre_cliente: "Consumidor Final",
      telefono_cliente: "0987654321"
    }
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateClienteDto)
  cliente_nuevo?: CreateClienteDto;

  @ApiProperty({ 
    description: 'Detalles del pedido', 
    type: [CreateDetallePedidoDto],
    example: [{
      id_producto: 1,
      cantidad_producto: 1,
      nota_producto: "Sin azúcar"
    }]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDetallePedidoDto)
  detalles_pedido: CreateDetallePedidoDto[];
} 