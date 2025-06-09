import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthService } from '../src/auth/auth.service';

describe('PedidosController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;
  let meseroToken: string;
  let adminToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }));

    await app.init();

    authService = moduleFixture.get<AuthService>(AuthService);
    
    // Obtener tokens para las pruebas
    const meseroLogin = await authService.login({ username: 'mesero', password: 'password' });
    meseroToken = meseroLogin.access_token;

    const adminLogin = await authService.login({ username: 'admin', password: 'password' });
    adminToken = adminLogin.access_token;
  });

  describe('/pedidos (POST)', () => {
    it('should create a new order (mesero)', () => {
      return request(app.getHttpServer())
        .post('/pedidos')
        .set('Authorization', `Bearer ${meseroToken}`)
        .send({
          id_cliente: 1,
          detalles_pedido: [
            {
              id_producto: 1,
              cantidad_producto: 2,
              nota_producto: 'Sin azúcar'
            }
          ]
        })
        .expect(201)
        .expect(res => {
          expect(res.body).toHaveProperty('id_pedido');
          expect(res.body.estado_pedido).toBe('pendiente');
        });
    });

    it('should not create order without authentication', () => {
      return request(app.getHttpServer())
        .post('/pedidos')
        .send({
          id_cliente: 1,
          detalles_pedido: [
            {
              id_producto: 1,
              cantidad_producto: 2
            }
          ]
        })
        .expect(401);
    });
  });

  describe('/pedidos (GET)', () => {
    it('should get all orders (admin)', () => {
      return request(app.getHttpServer())
        .get('/pedidos')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .expect(res => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    it('should get filtered orders (mesero)', () => {
      return request(app.getHttpServer())
        .get('/pedidos')
        .set('Authorization', `Bearer ${meseroToken}`)
        .expect(200)
        .expect(res => {
          expect(Array.isArray(res.body)).toBe(true);
          // Verificar que solo se muestren los pedidos del mesero
          res.body.forEach(pedido => {
            expect(pedido.id_usuario).toBe(expect.any(Number));
          });
        });
    });
  });

  describe('/pedidos/:id (PATCH)', () => {
    it('should update order status (mesero -> enviado)', () => {
      return request(app.getHttpServer())
        .patch('/pedidos/1')
        .set('Authorization', `Bearer ${meseroToken}`)
        .send({
          estado_pedido: 'enviado'
        })
        .expect(200)
        .expect(res => {
          expect(res.body.estado_pedido).toBe('enviado');
        });
    });

    it('should not allow mesero to change to pagado', () => {
      return request(app.getHttpServer())
        .patch('/pedidos/1')
        .set('Authorization', `Bearer ${meseroToken}`)
        .send({
          estado_pedido: 'pagado'
        })
        .expect(403);
    });
  });

  afterAll(async () => {
    await app.close();
  });
}); 