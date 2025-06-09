// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(cedula: string, password: string): Promise<any> {
    const user = await this.usuariosService.findOneByCedula(cedula);
    if (user && await bcrypt.compare(password, user.password_usuario)) {
      const { password_usuario, ...result } = user;
      return result;
    }
    return null;
  }

  async login(cedula: string, password: string) {
    const user = await this.validateUser(cedula, password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: user.id_usuario,
      cedula: user.cedula_usuario,
      rol: user.rol_usuario
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id_usuario,
        cedula: user.cedula_usuario,
        nombre: user.nombre_usuario,
        apellido: user.apellido_usuario,
        rol: user.rol_usuario,
      },
    };
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
