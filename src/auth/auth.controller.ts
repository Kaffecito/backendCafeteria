import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

class LoginDto {
  cedula: string;
  password: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @ApiBody({
    type: LoginDto,
    description: 'Credenciales de usuario',
    examples: {
      ejemplo: {
        value: {
          cedula: "1850149905",
          password: "Dalembertbravo"
        }
      }
    }
  })
  async login(@Body() body: any) {
    return this.authService.login(body.cedula, body.password);
  }
}
