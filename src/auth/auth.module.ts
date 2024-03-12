import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
