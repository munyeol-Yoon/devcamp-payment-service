import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductReqDto } from '../dto/product.req.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/auth/entities/user.entity';
import { ProductResDto } from '../dto/product.res.dto';
import { ProductModel } from '../entities/product.entity';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.admin)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() body: ProductReqDto): Promise<ProductResDto> {
    return this.productService.createProduct(body);
  }

  @Get()
  async getAllProduct(): Promise<ProductModel[]> {
    return this.productService.getAllProduct();
  }
}
