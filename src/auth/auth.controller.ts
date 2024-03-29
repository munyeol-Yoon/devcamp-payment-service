import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserReqDto } from './dto/user.req.dto';
import { UserResDto } from './dto/user.res.dto';
import { AuthService } from './auth.service';
import { LoginReqDto } from './dto/login.req.dto';
import { AccessToken, RefreshToken, Tokens } from 'src/common/types/types';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { Role, UserModel } from './entities/user.entity';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signUp(@Body() body: UserReqDto): Promise<UserResDto> {
    const user = await this.userService.createUser(body);

    return {
      accessToken: user['accessToken'],
      refreshToken: user['refreshToken'],
      name: user['name'],
      email: user['email'],
      createdAt: user['createdAt'],
      updatedAt: user['updatedAt'],
    };
  }

  @Post('login')
  async login(@Body() body: LoginReqDto): Promise<Tokens> {
    return await this.authService.login(body);
  }

  @Post('refresh')
  async refresh(@Body() body: RefreshToken): Promise<AccessToken> {
    return await this.authService.accessTokenRefresh(body);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile() {
    return '가드 테스트';
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.admin)
  @Get('user')
  async getUsers(): Promise<UserModel[]> {
    return await this.userService.getUsers();
  }
}
