import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProductosModule } from './productos/productos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
import { DetallePedidoModule } from './detalle-pedido/detalle-pedido.module';
import { PagosModule } from './pagos/pagos.module';
import { BilletesPagoModule } from './billetes-pago/billetes-pago.module';
import { ReportesModule } from './reportes/reportes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'cafeteria',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    UsuariosModule,
    ProductosModule,
    CategoriasModule,
    PedidosModule,
    AuthModule,
    ClientesModule,
    DetallePedidoModule,
    PagosModule,
    BilletesPagoModule,
    ReportesModule,
  ],
})
export class AppModule {}
