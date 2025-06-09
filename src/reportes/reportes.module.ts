import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';
import { Pedido } from '../pedidos/pedido.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Categoria } from '../categorias/categoria.entity';
import { DetallePedido } from '../detalle-pedido/detalle-pedido.entity';
import { PedidosModule } from '../pedidos/pedidos.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { CategoriasModule } from '../categorias/categorias.module';
import { DetallePedidoModule } from '../detalle-pedido/detalle-pedido.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, Usuario, Categoria, DetallePedido]),
    PedidosModule,
    UsuariosModule,
    CategoriasModule,
    DetallePedidoModule,
  ],
  controllers: [ReportesController],
  providers: [ReportesService],
})
export class ReportesModule {}
