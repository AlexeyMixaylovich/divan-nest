import { ApiProperty } from '@nestjs/swagger';
import { EDirection } from 'src/modules/product/constants/sort-direction';
import { ESortField } from 'src/modules/product/constants/sort-field';

export class SortDto {
  @ApiProperty({ enum: ESortField })
  field: ESortField;
  @ApiProperty({ enum: EDirection })
  direction: EDirection;
}
