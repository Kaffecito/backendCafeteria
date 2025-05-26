import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { ProductosService } from './productos.service';
import { Producto } from './producto.entity';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  getAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.productosService.findOne(id);
  }

  // ✅ Nuevo método para crear con imagen
  @Post()
  @UseInterceptors(
    FileInterceptor('imagen_url', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: Partial<Producto>,
  ) {
    if (file) {
      body.imagen_url = file.filename;
    }
    return this.productosService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Partial<Producto>) {
    return this.productosService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productosService.delete(id);
  }
}
