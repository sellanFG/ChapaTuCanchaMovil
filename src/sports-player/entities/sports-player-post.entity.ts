import { ApiProperty } from '@nestjs/swagger';

export class SportsPlayerPost {
  @ApiProperty({ description: 'The number of sports created' })
  count: number;
}
