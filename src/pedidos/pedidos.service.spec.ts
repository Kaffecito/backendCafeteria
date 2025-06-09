import { Test, TestingModule } from '@nestjs/testing';
import { PedidosService } from './pedidos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pedido, EstadoPedido } from './pedido.entity';
import { DetallePedido } from '../detalle-pedido/detalle-pedido.entity';
import { ProductosService } from '../productos/productos.service';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('PedidosService', () => {
  let service: PedidosService;
  let pedidoRepository: Repository<Pedido>;
  let detallePedidoRepository: Repository<DetallePedido>;
  let productosService: ProductosService;

  const mockPedidoRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockDetallePedidoRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockProductosService = {
    findOne: jest.fn(),
    updateStock: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidosService,
        {
          provide: getRepositoryToken(Pedido),
          useValue: mockPedidoRepository,
        },
        {
          provide: getRepositoryToken(DetallePedido),
          useValue: mockDetallePedidoRepository,
        },
        {
          provide: ProductosService,
          useValue: mockProductosService,
        },
      ],
    }).compile();

    service = module.get<PedidosService>(PedidosService);
    pedidoRepository = module.get<Repository<Pedido>>(getRepositoryToken(Pedido));
    detallePedidoRepository = module.get<Repository<DetallePedido>>(getRepositoryToken(DetallePedido));
    productosService = module.get<ProductosService>(ProductosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new order successfully', async () => {
      const createPedidoDto = {
        id_cliente: 1,
        detalles_pedido: [
          {
            id_producto: 1,
            cantidad_producto: 2,
            nota_producto: 'Sin azúcar',
          },
        ],
      };

      const mockProducto = {
        id_producto: 1,
        nombre_producto: 'Café',
        precio_producto: 2.5,
        stock_producto: 10,
      };

      const mockPedido = {
        id_pedido: 1,
        id_usuario: 1,
        id_cliente: 1,
        estado_pedido: EstadoPedido.PENDIENTE,
        total_pedido: 0,
      };

      mockProductosService.findOne.mockResolvedValue(mockProducto);
      mockPedidoRepository.create.mockReturnValue(mockPedido);
      mockPedidoRepository.save.mockResolvedValue({ ...mockPedido, total_pedido: 5 });

      const result = await service.create(1, createPedidoDto);

      expect(result).toBeDefined();
      expect(result.total_pedido).toBe(5);
      expect(mockProductosService.updateStock).toHaveBeenCalled();
    });

    it('should throw BadRequestException when insufficient stock', async () => {
      const createPedidoDto = {
        id_cliente: 1,
        detalles_pedido: [
          {
            id_producto: 1,
            cantidad_producto: 20,
            nota_producto: 'Sin azúcar',
          },
        ],
      };

      const mockProducto = {
        id_producto: 1,
        nombre_producto: 'Café',
        precio_producto: 2.5,
        stock_producto: 10,
      };

      mockProductosService.findOne.mockResolvedValue(mockProducto);

      await expect(service.create(1, createPedidoDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('should return a pedido if it exists', async () => {
      const mockPedido = {
        id_pedido: 1,
        estado_pedido: EstadoPedido.PENDIENTE,
      };

      mockPedidoRepository.findOne.mockResolvedValue(mockPedido);

      const result = await service.findOne(1);
      expect(result).toEqual(mockPedido);
    });

    it('should throw NotFoundException if pedido does not exist', async () => {
      mockPedidoRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });
});
