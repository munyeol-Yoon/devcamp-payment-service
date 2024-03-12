import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    return this.validationRequest(req);
  }

  private async validationRequest(req: any): Promise<boolean> {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('헤더에 토큰이 없습니다.');
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token.');
    }

    await this.authService.tokenValidation({
      accessToken: token,
    });

    return true;
  }
}
