import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './pago.entity';
import { CrearPagoDto } from './dto/crear-pago.dto';
import { PedidosService } from '../pedidos/pedidos.service';
import { PagoResponseDto } from './dto/pago-response.dto';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,
    private readonly pedidosService: PedidosService,
  ) {}

  async procesarPago(idPedido: number, crearPagoDto: CrearPagoDto): Promise<PagoResponseDto> {
    const pedido = await this.pedidosService.findOne(idPedido);
    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${idPedido} no encontrado`);
    }

    if (crearPagoDto.monto_recibido < pedido.total_pedido) {
      throw new BadRequestException('El monto recibido es menor al total del pedido');
    }

    const vuelto = crearPagoDto.monto_recibido - pedido.total_pedido;

    const pago = this.pagoRepository.create({
      ...crearPagoDto,
      pedido,
      monto_pago: pedido.total_pedido,
      vuelto,
      fecha_pago: new Date(),
    });

    const pagoGuardado = await this.pagoRepository.save(pago);

    return {
      id_pago: pagoGuardado.id_pago,
      id_pedido: pedido.id_pedido,
      monto_pago: pagoGuardado.monto_pago,
      monto_recibido: pagoGuardado.monto_recibido,
      vuelto: pagoGuardado.vuelto,
      metodo_pago: pagoGuardado.metodo_pago,
      fecha_pago: pagoGuardado.fecha_pago,
      referencia_pago: pagoGuardado.referencia_pago,
      requiere_factura: pagoGuardado.requiere_factura,
      notas_pago: pagoGuardado.notas_pago,
      detalles_pago: {
        total_pedido: pedido.total_pedido,
        monto_recibido: pagoGuardado.monto_recibido,
        vuelto: pagoGuardado.vuelto,
        requiere_factura: pagoGuardado.requiere_factura,
      },
    };
  }

  async findByPedido(idPedido: number): Promise<PagoResponseDto[]> {
    const pagos = await this.pagoRepository.find({
      where: { pedido: { id_pedido: idPedido } },
      relations: ['pedido'],
    });

    return pagos.map(pago => ({
      id_pago: pago.id_pago,
      id_pedido: pago.pedido.id_pedido,
      monto_pago: pago.monto_pago,
      monto_recibido: pago.monto_recibido,
      vuelto: pago.vuelto,
      metodo_pago: pago.metodo_pago,
      fecha_pago: pago.fecha_pago,
      referencia_pago: pago.referencia_pago,
      requiere_factura: pago.requiere_factura,
      notas_pago: pago.notas_pago,
      detalles_pago: {
        total_pedido: pago.pedido.total_pedido,
        monto_recibido: pago.monto_recibido,
        vuelto: pago.vuelto,
        requiere_factura: pago.requiere_factura,
      },
    }));
  }
}
