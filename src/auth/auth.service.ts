// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usuariosService: UsuariosService,
  ) {}

  async login(cedula: string, password: string) {
    const usuario = await this.usuariosService.findOneByCedula(cedula);
    if (!usuario || usuario.password_usuario !== password) {
      throw new Error('Usuario o contraseña incorrectos');
    }
    return this.jwtService.sign({ id: usuario.id_usuario });
  }
}
