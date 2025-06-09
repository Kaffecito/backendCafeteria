import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallePedidoService } from './detalle-pedido.service';
import { DetallePedidoController } from './detalle-pedido.controller';
import { DetallePedido } from './detalle-pedido.entity';
import { ProductosModule } from '../productos/productos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetallePedido]),
    ProductosModule,
  ],
  controllers: [DetallePedidoController],
  providers: [DetallePedidoService],
  exports: [DetallePedidoService],
})
export class DetallePedidoModule {}
