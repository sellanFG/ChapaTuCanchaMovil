import { ApiProperty } from '@nestjs/swagger';
enum SportType {
  SportName = 'SportName',
  SportDescription = 'SportDescription',
  SportImage = 'SportImage',
}
export class SportsPlayerEntity {
  @ApiProperty()
  sportId: number;

  @ApiProperty()
  playerId: number;

  @ApiProperty()
  status: boolean;

  @ApiProperty({
    enumName: 'SportType',
    enum: SportType,
  })
  sport: SportType;
}
