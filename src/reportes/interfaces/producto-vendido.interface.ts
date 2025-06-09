export interface ProductoVendido {
  producto: {
    id_producto: number;
    nombre_producto: string;
    categoria: {
      nombre_categoria: string;
    };
  };
  cantidadTotal: number;
  ventasTotal: number;
} 