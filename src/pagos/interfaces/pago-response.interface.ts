import { Pago } from '../pago.entity';

export interface DetallesPago {
  total_pedido: number;
  monto_recibido: number;
  vuelto: number;
  requiere_factura: boolean;
}

export interface PagoResponse extends Pago {
  detalles_pago: DetallesPago;
} 