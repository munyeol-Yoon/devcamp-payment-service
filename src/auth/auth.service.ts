import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { v4 as uuid } from 'uuid';
import { Payload } from 'src/common/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  createTokenPayload(userId: string): Payload {
    return {
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
      jti: uuid(),
    };
  }
  async createAccessToken(payload: Payload): Promise<string> {
    const expiresIn = this.configService.get<string>('ACCESS_EXPIRES');

    const key = this.configService.get<string>('JWT_SECRET');

    const token = this.jwtService.sign(payload, {
      expiresIn,
      secret: key,
    });

    return token;
  }

  async createRefreshToken(payload: Payload): Promise<string> {
    const expiresIn = this.configService.get<string>('REFRESH_EXPIRES');

    const key = this.configService.get<string>('JWT_SECRET');

    const token = this.jwtService.sign(payload, {
      expiresIn,
      secret: key,
    });

    return token;
  }
}
