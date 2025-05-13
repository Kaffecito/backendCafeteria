import { Module } from '@nestjs/common';
import { BilletesPagoService } from './billetes-pago.service';
import { BilletesPagoController } from './billetes-pago.controller';

@Module({
  providers: [BilletesPagoService],
  controllers: [BilletesPagoController]
})
export class BilletesPagoModule {}
