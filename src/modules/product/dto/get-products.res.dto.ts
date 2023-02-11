import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { LeanDocument } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/product.schema';

class AdditionalProductInfo {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  createdA: Date;
  @ApiProperty()
  updatedAt: Date;
}

class ProductDto extends IntersectionType(Product, AdditionalProductInfo) {}

export class GetProductsResDto {
  @ApiProperty({ isArray: true, type: ProductDto })
  items: LeanDocument<ProductDocument>[];
  @ApiProperty()
  total: number;
}
