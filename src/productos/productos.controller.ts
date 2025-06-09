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
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolUsuario } from '../usuarios/usuario.entity';

import { ProductosService } from './productos.service';
import { Producto } from './producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@ApiTags('productos')
@Controller('productos')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @Post('upload/:id')
  @Roles(RolUsuario.ADMIN)
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads/productos',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new BadRequestException('Solo se permiten archivos de imagen'), false);
        }
        cb(null, true);
      },
    }),
  )
  @ApiOperation({ summary: 'Subir imagen de un producto' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        imagen: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Imagen subida exitosamente' })
  @ApiResponse({ status: 400, description: 'Archivo inválido' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async uploadImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.productosService.updateImage(+id, file.filename);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos' })
  async findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto encontrado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async findOne(@Param('id') id: string) {
    return this.productosService.findOne(+id);
  }

  @Get('categoria/:id')
  @ApiOperation({ summary: 'Obtener productos por categoría' })
  @ApiResponse({ status: 200, description: 'Lista de productos por categoría' })
  async findByCategoria(@Param('id') id: string) {
    return this.productosService.findByCategoria(+id);
  }

  @Put(':id')
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Actualizar un producto' })
  @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiResponse({ status: 200, description: 'Producto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async remove(@Param('id') id: string) {
    return this.productosService.remove(+id);
  }
}
