// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosModule } from '../usuarios/usuarios.module';  // Importa UsuariosModule

@Module({
  imports: [
    JwtModule.register({
      secret: 'kaffecito', 
      signOptions: { expiresIn: '1h' },
    }),
    UsuariosModule,  // Asegúrate de importar UsuariosModule
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
