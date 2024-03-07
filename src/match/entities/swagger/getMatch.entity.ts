import { ApiProperty } from '@nestjs/swagger';

const sport: Record<string, any> = {
  sportId: 0,
  sportImage: 'url',
  sportName: 'string',
};

const gameMode: Record<string, any> = {
  gameModeId: 0,
  gameModeName: 'string',
};
const sportField: Record<string, any> = {
  sportFieldId: 0,
  sportFieldName: 'string',
};

export class GetMatch {
  @ApiProperty({ type: Number })
  matchId: number;
  @ApiProperty({ type: Date })
  matchDate: Date;
  @ApiProperty({ type: Date })
  matchTime: Date;
  @ApiProperty({ type: String })
  matchDistrict: string;
  @ApiProperty({ type: Date })
  matchRegistrationDate: Date;
  @ApiProperty({ type: Boolean })
  stateField: boolean;
  @ApiProperty({ enum: { sport } })
  Sport: Record<string, any>;
  @ApiProperty({ enum: { gameMode } })
  GameMode: Record<string, any>;
  @ApiProperty({ enum: { sportField } })
  SportField: Record<string, any>;
}
