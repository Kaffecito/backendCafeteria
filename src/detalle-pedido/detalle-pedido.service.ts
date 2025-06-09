import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetallePedido } from './detalle-pedido.entity';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { ProductosService } from '../productos/productos.service';

@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectRepository(DetallePedido)
    private readonly detallePedidoRepository: Repository<DetallePedido>,
    private readonly productosService: ProductosService,
  ) {}

  async create(createDetallePedidoDto: CreateDetallePedidoDto): Promise<DetallePedido> {
    const producto = await this.productosService.findOne(createDetallePedidoDto.id_producto);
    
    const detallePedido = this.detallePedidoRepository.create({
      ...createDetallePedidoDto,
      producto,
    });

    return this.detallePedidoRepository.save(detallePedido);
  }

  async findAll(): Promise<DetallePedido[]> {
    return this.detallePedidoRepository.find({
      relations: ['pedido', 'producto'],
    });
  }

  async findOne(id: number): Promise<DetallePedido> {
    const detallePedido = await this.detallePedidoRepository.findOne({
      where: { id_detalle_pedido: id },
      relations: ['pedido', 'producto'],
    });

    if (!detallePedido) {
      throw new NotFoundException(`Detalle de pedido con ID ${id} no encontrado`);
    }

    return detallePedido;
  }

  async findByPedido(pedidoId: number): Promise<DetallePedido[]> {
    return this.detallePedidoRepository.find({
      where: { id_pedido: pedidoId },
      relations: ['producto'],
    });
  }

  async remove(id: number): Promise<void> {
    const detallePedido = await this.findOne(id);
    await this.detallePedidoRepository.remove(detallePedido);
  }
}
