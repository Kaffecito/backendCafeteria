import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { Pedido } from './pedido.entity';
import { DetallePedido } from '../detalle-pedido/detalle-pedido.entity';
import { DetallePedidoModule } from '../detalle-pedido/detalle-pedido.module';
import { ProductosModule } from '../productos/productos.module';
import { ClientesModule } from '../clientes/clientes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, DetallePedido]),
    DetallePedidoModule,
    ProductosModule,
    ClientesModule,
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
  exports: [PedidosService]
})
export class PedidosModule {}
