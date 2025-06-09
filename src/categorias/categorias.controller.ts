import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolUsuario } from '../usuarios/usuario.entity';

@ApiTags('categorias')
@Controller('categorias')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiResponse({ status: 201, description: 'Categoría creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  @ApiResponse({ status: 200, description: 'Lista de categorías' })
  async findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  @ApiResponse({ status: 200, description: 'Categoría encontrada' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  async findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(+id);
  }

  @Get(':id/productos')
  @ApiOperation({ summary: 'Obtener todos los productos de una categoría' })
  @ApiResponse({ status: 200, description: 'Lista de productos de la categoría' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  async findProductos(@Param('id') id: string) {
    return this.categoriasService.findProductos(+id);
  }

  @Patch(':id')
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Actualizar una categoría' })
  @ApiResponse({ status: 200, description: 'Categoría actualizada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Eliminar una categoría' })
  @ApiResponse({ status: 200, description: 'Categoría eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id);
  }
}
