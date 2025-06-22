import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido, EstadoPedido } from './pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ProductosService } from '../productos/productos.service';
import { DetallePedidoService } from '../detalle-pedido/detalle-pedido.service';
import { RolUsuario } from '../usuarios/usuario.entity';
import { ClientesService } from '../clientes/clientes.service';
import { CreateDetallePedidoDto } from '../detalle-pedido/dto/create-detalle-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    private readonly detallePedidoService: DetallePedidoService,
    private readonly productosService: ProductosService,
    private readonly clientesService: ClientesService,
  ) {}

  async create(createPedidoDto: CreatePedidoDto, id_usuario: number): Promise<Pedido> {
    // Si no hay id_cliente pero hay información de nuevo cliente, crear el cliente
    if (!createPedidoDto.id_cliente && createPedidoDto.cliente_nuevo) {
      const nuevoCliente = await this.clientesService.crear({
        ...createPedidoDto.cliente_nuevo,
        nombre_cliente: createPedidoDto.cliente_nuevo.nombre_cliente || 'Consumidor Final',
        tipo_cliente: createPedidoDto.cliente_nuevo.tipo_cliente || 'final'
      });
      createPedidoDto.id_cliente = nuevoCliente.id_cliente;
    } else if (!createPedidoDto.id_cliente) {
      // Si no hay id_cliente ni información de nuevo cliente, crear un consumidor final
      const consumidorFinal = await this.clientesService.crear({
        nombre_cliente: 'Consumidor Final',
        tipo_cliente: 'final'
      });
      createPedidoDto.id_cliente = consumidorFinal.id_cliente;
    }

    // Calcular el total inicial del pedido
    let totalPedido = 0;
    const detallesConPrecios: CreateDetallePedidoDto[] = [];

    // Preparar los detalles con precios
    for (const detalle of createPedidoDto.detalles_pedido) {
      const producto = await this.productosService.findOne(detalle.id_producto);
      const precio = producto.precio_producto;
      totalPedido += precio * detalle.cantidad_producto;
      
      detallesConPrecios.push({
        ...detalle,
        precio_unitario_producto: precio
      });
    }

    // Crear el pedido con el total calculado
    const nuevoPedido = this.pedidoRepository.create({
      id_usuario,
      total_pedido: totalPedido,
      estado_pedido: EstadoPedido.PENDIENTE,
    });
    
    // Guardar el pedido
    const pedidoGuardado = await this.pedidoRepository.save(nuevoPedido);

    // Crear los detalles del pedido
    for (const detalle of detallesConPrecios) {
      await this.detallePedidoService.create({
        ...detalle,
        id_pedido: pedidoGuardado.id_pedido
      });
    }

    // Retornar el pedido con sus detalles
    return this.findOne(pedidoGuardado.id_pedido);
  }

  async findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      relations: ['detalles_pedido', 'detalles_pedido.producto'],
    });
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id_pedido: id },
      relations: ['detalles_pedido', 'detalles_pedido.producto'],
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }

    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto, userRole: RolUsuario, userId: number): Promise<Pedido> {
    const pedido = await this.findOne(id);
    
    // Si es mesero, solo puede actualizar sus propios pedidos y que estén pendientes
    if (userRole === RolUsuario.MESERO) {
      if (pedido.id_usuario !== userId) {
        throw new ForbiddenException('No puedes modificar pedidos de otros meseros');
      }
      
      if (pedido.estado_pedido !== EstadoPedido.PENDIENTE) {
        throw new ForbiddenException('Solo puedes modificar pedidos que estén pendientes');
      }
    }

    // La cajera puede actualizar pedidos en cualquier estado
    await this.pedidoRepository.update(id, updatePedidoDto);
    return this.findOne(id);
  }

  async remove(id: number, userRole: RolUsuario, userId: number): Promise<void> {
    const pedido = await this.findOne(id);
    
    // Si es mesero, solo puede eliminar sus propios pedidos y que estén pendientes
    if (userRole === RolUsuario.MESERO) {
      if (pedido.id_usuario !== userId) {
        throw new ForbiddenException('No puedes eliminar pedidos de otros meseros');
      }
      
      if (pedido.estado_pedido !== EstadoPedido.PENDIENTE) {
        throw new ForbiddenException('Solo puedes eliminar pedidos que estén pendientes');
      }
    }

    await this.pedidoRepository.delete(id);
  }

  async findByUsuario(userId: number): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      where: { id_usuario: userId },
      relations: ['detalles_pedido', 'detalles_pedido.producto'],
    });
  }

  async calcularTotal(id: number): Promise<number> {
    const pedido = await this.findOne(id);
    let total = 0;

    for (const detalle of pedido.detalles_pedido) {
      total += detalle.cantidad_producto * detalle.producto.precio_producto;
    }

    return total;
  }
}
