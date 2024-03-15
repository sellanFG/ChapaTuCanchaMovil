import { ApiProperty } from '@nestjs/swagger';

const sport: Record<string, any> = {
  sportName: 'string',
  sportDescription: 'string',
  sportImage: 'string',
};

export class SportsPlayerEntitySwagger {
  @ApiProperty()
  sportId: number;

  @ApiProperty()
  playerId: number;

  @ApiProperty({ enum: { sport } })
  sport: Record<string, any>;
}
