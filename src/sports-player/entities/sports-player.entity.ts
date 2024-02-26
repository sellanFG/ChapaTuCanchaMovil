import { ApiProperty } from '@nestjs/swagger';
export class SportsPlayer {
  @ApiProperty()
  PlayerId: number;

  @ApiProperty({ type: [Number] })
  SportId: number[];
}
