import { Test, TestingModule } from '@nestjs/testing';
import { BilletesPagoController } from './billetes-pago.controller';

describe('BilletesPagoController', () => {
  let controller: BilletesPagoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BilletesPagoController],
    }).compile();

    controller = module.get<BilletesPagoController>(BilletesPagoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
