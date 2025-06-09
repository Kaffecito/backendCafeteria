import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { EstadoPedido } from '../pedido.entity';

export class UpdatePedidoDto {
  @ApiProperty({ description: 'Estado del pedido', enum: EstadoPedido, example: 'servido', required: false })
  @IsEnum(EstadoPedido)
  @IsOptional()
  estado_pedido?: EstadoPedido;
} 