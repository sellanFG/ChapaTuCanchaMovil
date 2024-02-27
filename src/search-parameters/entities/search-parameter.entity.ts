import { ApiProperty } from '@nestjs/swagger';

export class SearchParametersEntity {
  @ApiProperty()
  searchParametersId: number;

  @ApiProperty()
  searchParametersMatchDate: Date;

  @ApiProperty()
  searchParametersMatchStartTime: Date;

  @ApiProperty()
  searchParametersMatchEndTime: Date;

  @ApiProperty()
  searchParametersDistrict: string;

  @ApiProperty()
  SportId: number;

  @ApiProperty()
  GameModeId: number;

  @ApiProperty()
  TeamId: number;
}
