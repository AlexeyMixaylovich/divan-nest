import { Body, Controller, Get, Post } from '@nestjs/common';
import { LeanDocument } from 'mongoose';
import { CATEGORIES } from 'src/constants/categories';
import { ProductDocument } from 'src/schemas/product.schema';
import { TCategory } from 'src/types/categories';
import { ParserService } from '../parser/parser.service';
import { ProductService } from '../product/product.service';
import { TGetProductsArguments } from '../product/types/product-list';

@Controller()
export class ApiController {
  constructor(
    private readonly productService: ProductService,
    private readonly parserService: ParserService,
  ) {}

  @Get('product/categories')
  getCategory(): { items: TCategory[] } {
    return {
      items: [{ name: 'all', code: '' }, ...CATEGORIES],
    };
  }

  @Post('product/list')
  async getProductList(@Body() data: TGetProductsArguments): Promise<{
    items: LeanDocument<ProductDocument>[];
    total: number;
  }> {
    const { products, total } = await this.productService.getProducts(data);
    return { items: products, total };
  }

  @Get('parser/load/products')
  loadProducts(): string {
    // this.parserService.parseData();
    return 'download started';
  }
  @Get('parser/load/products-img')
  loadProductImg(): string {
    // this.parserService.loadImg();
    return 'download started';
  }
}
