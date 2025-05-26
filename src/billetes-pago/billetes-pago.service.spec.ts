import { Test, TestingModule } from '@nestjs/testing';
import { BilletesPagoService } from './billetes-pago.service';

describe('BilletesPagoService', () => {
  let service: BilletesPagoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BilletesPagoService],
    }).compile();

    service = module.get<BilletesPagoService>(BilletesPagoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
