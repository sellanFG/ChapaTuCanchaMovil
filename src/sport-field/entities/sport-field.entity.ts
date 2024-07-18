import { ApiProperty } from '@nestjs/swagger';

export class sportField {
  @ApiProperty()
  sportFieldId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;
}