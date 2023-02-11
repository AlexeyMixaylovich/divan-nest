import { ApiProperty } from '@nestjs/swagger';

export class NavigateDto {
  @ApiProperty()
  skip: number;
  @ApiProperty()
  limit: number;
}
