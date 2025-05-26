import { Module } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from 'src/pedidos/pedido.entity';
import { Usuario } from 'src/usuarios/usuario.entity';

@Module({
   imports: [TypeOrmModule.forFeature([Pedido, Usuario])],
  providers: [ReportesService],
  controllers: [ReportesController]
})
export class ReportesModule {}
