import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { Pedido } from './pedido.entity';
import { ProductosModule } from '../productos/productos.module';
import { DetallePedidoModule } from '../detalle-pedido/detalle-pedido.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { ClientesModule } from '../clientes/clientes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido]),
    ProductosModule,
    DetallePedidoModule,
    UsuariosModule,
    ClientesModule
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
  exports: [PedidosService]
})
export class PedidosModule {}
