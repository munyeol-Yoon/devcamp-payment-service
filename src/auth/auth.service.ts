import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { v4 as uuid } from 'uuid';
import { Payload, Tokens } from 'src/common/types/types';
import { LoginReqDto } from './dto/login.req.dto';
import { CustomException } from 'src/http-exception/custom-exception';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}
  async login(dto: LoginReqDto): Promise<Tokens> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new CustomException(
        'user',
        '가입되지 않은 이메일 입니다.',
        '가입되지 않은 이메일 입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.checkPassword(user.password, dto.password);

    const payload = this.createTokenPayload(user.id);

    const [accessToken, refreshToken] = await Promise.all([
      this.createAccessToken(payload),
      this.createRefreshToken(payload),
    ]);

    return { accessToken, refreshToken };
  }

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

  async checkPassword(
    password: string,
    savedPassword: string,
  ): Promise<boolean> {
    const verifyUser = await argon2.verify(password, savedPassword);
    if (!verifyUser) {
      throw new CustomException(
        'user',
        '이메일 또는 비밀번호가 일치하지 않습니다.',
        '이메일 또는 비밀번호가 일치하지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return verifyUser;
  }
}
