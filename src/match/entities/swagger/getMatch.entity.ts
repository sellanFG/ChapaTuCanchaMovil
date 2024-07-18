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
  date: Date;
  @ApiProperty({ type: Date })
  time: Date;
  @ApiProperty({ type: String })
  district: string;
  @ApiProperty({ type: Date })
  registrationDate: Date;
  @ApiProperty({ type: Boolean })
  stateField: boolean;
  @ApiProperty({ enum: { sport } })
  sport: Record<string, any>;
  @ApiProperty({ enum: { gameMode } })
  gameMode: Record<string, any>;
  @ApiProperty({ enum: { sportField } })
  sportField: Record<string, any>;
}
