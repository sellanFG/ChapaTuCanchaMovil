import { ApiProperty } from '@nestjs/swagger';

const player: Record<string, any> = {
  playerId: 0,
  playerUsername: 'string',
  playerImage: 'string',
  playerFirstName: 'string',
  playerLastName: 'string',
};
export class GetTeamMatch {
  @ApiProperty()
  teamId: number;
  @ApiProperty()
  matchId: number;
  @ApiProperty()
  statusNFU: boolean;
  @ApiProperty()
  playerId: boolean;

  @ApiProperty({ enum: { player } })
  Player: Record<string, any>;
}
