import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './pagos.entity';


@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago)
    private pagoRepo: Repository<Pago>,
  ) {}

  crear(pago: Partial<Pago>) {
    return this.pagoRepo.save(pago);
  }

  listarTodos() {
    return this.pagoRepo.find();
  }

  buscarPorId(id: number) {
    return this.pagoRepo.findOneBy({ id_pago: id });
  }

  actualizar(id: number, datos: Partial<Pago>) {
    return this.pagoRepo.update(id, datos);
  }

  eliminar(id: number) {
    return this.pagoRepo.delete(id);
  }
}
