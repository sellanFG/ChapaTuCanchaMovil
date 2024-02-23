import { ApiProperty } from '@nestjs/swagger';

export class Answer {
  @ApiProperty()
  answerId: number;

  @ApiProperty()
  answer: string;

  @ApiProperty()
  questionId: number;
}
