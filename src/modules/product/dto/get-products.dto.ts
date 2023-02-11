import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NavigateDto } from 'src/dto/navigate.dto';
import { SortDto } from 'src/dto/sort.dto';
import { FiltersDto } from './filters.dto';

export class GetProductsDto {
  @ApiProperty()
  navigate: NavigateDto;
  @ApiPropertyOptional()
  filters?: FiltersDto;
  @ApiPropertyOptional({ isArray: true, type: SortDto })
  sort?: SortDto[];
}
