import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
import { ProductUpdateReqDto } from '../dto/product-update.req.dto';
import { Message } from 'src/common/types/types';

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

  @Get('/:id')
  async getProduct(@Param('id') id: string): Promise<ProductResDto> {
    return this.productService.getProduct(id);
  }

  @Patch('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() body: ProductUpdateReqDto,
  ): Promise<ProductModel> {
    return this.productService.updateProduct(id, body);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string): Promise<Message> {
    return this.productService.deleteProduct(id);
  }
}
