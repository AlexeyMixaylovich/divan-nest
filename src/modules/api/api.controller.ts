import { Controller, Get } from '@nestjs/common';
import { CATEGORIES } from 'src/constants/categories';
import { TCategory } from 'src/types/categories';
import { ParserService } from '../parser/parser.service';
import { ProductService } from '../product/product.service';

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
  @Get('parser/load/products')
  loadProducts(): string {
    this.parserService.parseData();
    return 'download started';
  }
}
