import {ApiProperty} from '@nestjs/swagger';

export class sportField {
  @ApiProperty()
  sportFieldId: number;

  @ApiProperty()
  sportFieldName: string;

  @ApiProperty()
  sportFieldAddress: string;
}