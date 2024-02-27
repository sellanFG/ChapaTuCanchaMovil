import { ApiProperty } from '@nestjs/swagger';

export class AnswerEntity {
  @ApiProperty()
  answerId: number;

  @ApiProperty()
  answer: string;

  @ApiProperty()
  questionId: number;
}
