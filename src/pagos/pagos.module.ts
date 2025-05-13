import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from './pagos.entity';
import { PagoController } from './pagos.controller';
import { PagoService } from './pagos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pago])],
  providers: [PagoService],
  controllers: [PagoController]
})
export class PagosModule {}
