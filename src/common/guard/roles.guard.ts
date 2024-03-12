import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/auth/entities/user.entity';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { UserRepository } from 'src/auth/user.repository';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const { headers } = context.switchToHttp().getRequest();
    console.log(headers);
    if (headers.authorization?.startsWith('Bearer ')) {
      const value = headers.authorization.substring(7);
      const token = {
        accessToken: value,
      };

      const verified = await this.authService.tokenValidation(token);
      const user = await this.userRepository.findOne(verified.sub);

      return requiredRoles.some((role) => user.role?.includes(role));
    }

    return null;
  }
}
