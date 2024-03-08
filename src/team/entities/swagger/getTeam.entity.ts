import { ApiProperty } from '@nestjs/swagger';

const sport: Record<string, any> = {
  sportId: 0,
  sportName: 'string',
  sportDescription: 'string',
  sportImage: 'string',
};

export class GetTeam {
  @ApiProperty()
  teamId: number;

  @ApiProperty()
  teamName: string;

  @ApiProperty()
  teamLogo: string;

  @ApiProperty()
  teamRegistrationDate: Date;

  @ApiProperty()
  teamSearchStatus: string;

  @ApiProperty()
  sportId: number;

  @ApiProperty({ enum: { sport } })
  Sport: Record<string, any>;
}
