import { Module } from '@nestjs/common';
import { DetallePedidoService } from './detalle-pedido.service';
import { DetallePedidoController } from './detalle-pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallePedido } from './detalle-pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetallePedido])],
  providers: [DetallePedidoService],
  controllers: [DetallePedidoController]
})
export class DetallePedidoModule {}
