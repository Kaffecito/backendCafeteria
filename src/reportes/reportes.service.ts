import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Pedido } from '../pedidos/pedido.entity';
import { DetallePedido } from '../detalle-pedido/detalle-pedido.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { RolUsuario } from '../usuarios/usuario.entity';
import { ProductoVendido } from './interfaces/producto-vendido.interface';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(DetallePedido)
    private readonly detallePedidoRepository: Repository<DetallePedido>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async getVentasPorPeriodo(fechaInicio: Date, fechaFin: Date) {
    const pedidos = await this.pedidoRepository.find({
      where: {
        fecha_pedido: Between(fechaInicio, fechaFin),
      },
      relations: ['usuario', 'detalles_pedido'],
    });

    const totalVentas = pedidos.reduce((sum, pedido) => sum + Number(pedido.total_pedido), 0);
    const cantidadPedidos = pedidos.length;

    return {
      totalVentas,
      cantidadPedidos,
      pedidos,
    };
  }

  async getVentasPorCategoria(fechaInicio: Date, fechaFin: Date) {
    const detalles = await this.detallePedidoRepository.find({
      where: {
        pedido: {
          fecha_pedido: Between(fechaInicio, fechaFin),
        },
      },
      relations: ['producto', 'producto.categoria'],
    });

    const ventasPorCategoria = detalles.reduce((acc, detalle) => {
      const categoria = detalle.producto.categoria.nombre_categoria;
      const subtotal = Number(detalle.precio_unitario_producto) * detalle.cantidad_producto;

      if (!acc[categoria]) {
        acc[categoria] = {
          total: 0,
          cantidad: 0,
          productos: [],
        };
      }

      acc[categoria].total += subtotal;
      acc[categoria].cantidad += detalle.cantidad_producto;
      acc[categoria].productos.push({
        nombre: detalle.producto.nombre_producto,
        cantidad: detalle.cantidad_producto,
        subtotal,
      });

      return acc;
    }, {} as Record<string, { total: number; cantidad: number; productos: Array<{ nombre: string; cantidad: number; subtotal: number }> }>);

    return ventasPorCategoria;
  }

  async getDesempenoMeseros(fechaInicio: Date, fechaFin: Date) {
    const pedidos = await this.pedidoRepository.find({
      where: {
        fecha_pedido: Between(fechaInicio, fechaFin),
      },
      relations: ['usuario'],
    });

    const meseros = await this.usuarioRepository.find({
      where: { rol_usuario: RolUsuario.MESERO },
    });

    const desempeno = meseros.map(mesero => {
      const pedidosMesero = pedidos.filter(pedido => pedido.id_usuario === mesero.id_usuario);
      const totalVentas = pedidosMesero.reduce((sum, pedido) => sum + Number(pedido.total_pedido), 0);

      return {
        mesero: {
          id: mesero.id_usuario,
          nombre: mesero.nombre_usuario,
        },
        totalVentas,
        cantidadPedidos: pedidosMesero.length,
        promedioPorPedido: pedidosMesero.length > 0 ? totalVentas / pedidosMesero.length : 0,
      };
    });

    return desempeno;
  }

  async getProductosMasVendidos(fechaInicio: Date, fechaFin: Date, limite: number = 10): Promise<ProductoVendido[]> {
    const detalles = await this.detallePedidoRepository.find({
      where: {
        pedido: {
          fecha_pedido: Between(fechaInicio, fechaFin),
        },
      },
      relations: ['producto', 'producto.categoria'],
    });

    const productosMasVendidos = detalles.reduce((acc, detalle) => {
      const productoId = detalle.producto.id_producto;

      if (!acc[productoId]) {
        acc[productoId] = {
          producto: {
            id_producto: detalle.producto.id_producto,
            nombre_producto: detalle.producto.nombre_producto,
            categoria: {
              nombre_categoria: detalle.producto.categoria.nombre_categoria,
            },
          },
          cantidadTotal: 0,
          ventasTotal: 0,
        };
      }

      acc[productoId].cantidadTotal += detalle.cantidad_producto;
      acc[productoId].ventasTotal += Number(detalle.precio_unitario_producto) * detalle.cantidad_producto;

      return acc;
    }, {} as Record<number, ProductoVendido>);

    return Object.values(productosMasVendidos)
      .sort((a, b) => b.cantidadTotal - a.cantidadTotal)
      .slice(0, limite);
  }
}
