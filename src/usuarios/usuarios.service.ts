import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // Verificar si ya existe un usuario con la misma cédula
    if (!createUsuarioDto.cedula_usuario) {
      throw new BadRequestException('La cédula es requerida');
    }

    const existingUser = await this.findOneByCedula(createUsuarioDto.cedula_usuario);
    if (existingUser) {
      throw new ConflictException('Ya existe un usuario con esta cédula');
    }

    if (!createUsuarioDto.password_usuario) {
      throw new BadRequestException('La contraseña es requerida');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(createUsuarioDto.password_usuario, 10);
    
    const nuevoUsuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      password_usuario: hashedPassword,
    });

    return this.usuarioRepository.save(nuevoUsuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      select: [
        'id_usuario',
        'cedula_usuario',
        'nombre_usuario',
        'apellido_usuario',
        'fecha_nacimiento_usuario',
        'tipo_sangre_usuario',
        'rol_usuario',
        'estado_usuario',
      ],
    });
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario: id },
      select: [
        'id_usuario',
        'cedula_usuario',
        'nombre_usuario',
        'apellido_usuario',
        'fecha_nacimiento_usuario',
        'tipo_sangre_usuario',
        'rol_usuario',
        'estado_usuario',
      ],
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return usuario;
  }

  async findOneByCedula(cedula: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { cedula_usuario: cedula },
    });
  }

 async updateByCedula(cedula: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario | null> {
  const usuario = await this.usuarioRepository.findOne({ where: { cedula_usuario: cedula } });

  if (!usuario) {
    return null;
  }

  Object.assign(usuario, updateUsuarioDto);
  return this.usuarioRepository.save(usuario);
}


  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
  }

  async validateUser(cedula: string, password: string): Promise<Usuario | null> {
    const user = await this.findOneByCedula(cedula);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_usuario);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}