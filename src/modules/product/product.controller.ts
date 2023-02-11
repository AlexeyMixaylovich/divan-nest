import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CATEGORIES } from 'src/constants/categories';
import { GetCategoryResDto } from './dto/get-category.res.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { GetProductsResDto } from './dto/get-products.res.dto';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('categories')
  @ApiResponse({
    type: GetCategoryResDto,
    description: 'Получение категорий товаров',
  })
  getCategory(): GetCategoryResDto {
    return {
      items: [{ name: 'all', code: '' }, ...CATEGORIES],
    };
  }
  @Post('list')
  @ApiResponse({
    type: GetProductsResDto,
    description: 'Получение списка товаров',
  })
  async getProductList(
    @Body() data: GetProductsDto,
  ): Promise<GetProductsResDto> {
    const { products, total } = await this.productService.getProducts(data);
    return { items: products, total };
  }
}
