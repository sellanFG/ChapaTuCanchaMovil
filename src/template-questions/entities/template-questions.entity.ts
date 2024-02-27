import { ApiProperty } from '@nestjs/swagger';

export class QuestionsTemplate {
  @ApiProperty()
  questionsTemplateId: number;

  @ApiProperty()
  Question: string;

  @ApiProperty()
  SportId: number;
}
