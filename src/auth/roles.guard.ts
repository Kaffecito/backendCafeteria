import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolUsuario } from '../usuarios/usuario.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);
  
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    if (!user) {
      this.logger.warn('No user found in request');
      return false;
    }

    // Obtener el rol del usuario (puede estar en rol o rol_usuario)
    const userRole = (user.rol || user.rol_usuario || '').toLowerCase();
    
    if (!userRole) {
      this.logger.warn(`No role found for user: ${JSON.stringify(user)}`);
      return false;
    }

    // Si el usuario es SUPER_ADMIN, tiene acceso total
    if (userRole === RolUsuario.SUPER_ADMIN.toLowerCase()) {
      return true;
    }

    // Convertir los roles requeridos a minúsculas para la comparación
    const hasRole = requiredRoles
      .map(role => role.toLowerCase())
      .includes(userRole);

    if (!hasRole) {
      this.logger.warn(`User role ${userRole} does not match required roles: ${requiredRoles.join(', ')}`);
    }

    return hasRole;
  }
} 