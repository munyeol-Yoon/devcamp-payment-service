import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { CustomException } from 'src/http-exception/custom-exception';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/auth/user.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
    private configService: ConfigService,
  ) {}

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

    try {
      const { exp, ...payload } = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      const user = await this.userRepository.findOne(payload.sub);
      if (!user) {
        throw new CustomException(
          'auth',
          '유저 존재하지 않음',
          '유저 존재하지 않음',
          HttpStatus.UNAUTHORIZED,
        );
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException('토큰 검증 실해');
    }
  }
}
