import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { ProductRepository } from './repositories/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from './entities/product.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/auth/user.repository';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { UserModel } from 'src/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel, UserModel])],
  controllers: [ProductController],
  providers: [
    JwtService,
    AuthService,
    AuthGuard,

    UserRepository,

    ProductService,
    ProductRepository,
  ],
})
export class ProductModule {}
