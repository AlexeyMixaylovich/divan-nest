import { ApiPropertyOptional } from '@nestjs/swagger';
import { ProductDocument } from 'src/schemas/product.schema';

export class FiltersDto {
  @ApiPropertyOptional({ type: 'string' })
  category?: ProductDocument['category'];
}
