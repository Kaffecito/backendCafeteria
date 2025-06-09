import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    this.logger.debug(`Required roles: ${JSON.stringify(requiredRoles)}`);
    this.logger.debug(`User data: ${JSON.stringify(user)}`);
    
    const hasRole = requiredRoles.some((role) => user?.rol_usuario === role);
    this.logger.debug(`Has required role: ${hasRole}`);
    
    return hasRole;
  }
} 