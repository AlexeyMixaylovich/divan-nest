import { ApiProperty } from '@nestjs/swagger';

class CategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  code: string;
}

export class GetCategoryResDto {
  @ApiProperty({ isArray: true, type: CategoryDto })
  items: CategoryDto[];
}
