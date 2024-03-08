import { ApiProperty } from '@nestjs/swagger';

export class GetSport {
  @ApiProperty()
  SportId: number;

  @ApiProperty()
  SportName: string;

  @ApiProperty()
  SportDescription: string;

  @ApiProperty()
  SportImage: string;
}
