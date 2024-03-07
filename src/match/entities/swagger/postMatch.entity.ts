import { ApiProperty } from '@nestjs/swagger';

const sport: Record<string, any> = {
  sportId: 0,
  sportName: 'string',
  sportImage: 'string',
};

const gameMode: Record<string, any> = {
  gameModeId: 0,
  gameModeName: 'string',
};

const infoMatch: Record<string, any> = {
  matchId: 0,
  matchDate: 'string',
  matchTime: 'string',
  matchDistrict: 'string',
  Sport: sport,
  GameMode: gameMode,
};

const teams: Record<string, any>[] = [
  {
    teamId: 0,
    teamName: 'string',
    teamLogo: 'string',
  },
];

export class PostMatch {
  @ApiProperty({ enum: [infoMatch] })
  infoMatch: Record<string, any>;
  @ApiProperty({ enum: [teams] })
  teams: Record<string, any>[];
  @ApiProperty({ type: [Number] })
  playersNotSubscribIds: number[];
  @ApiProperty({ type: Date, nullable: true })
  endTime: Date;
}
