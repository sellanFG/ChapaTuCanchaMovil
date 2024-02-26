import { ApiProperty } from '@nestjs/swagger';

export class Sport {
  @ApiProperty()
  SportId: number;

  @ApiProperty()
  SportName: string;

  @ApiProperty()
  SportDescription: string;

  @ApiProperty()
  SportImage: string;
}
