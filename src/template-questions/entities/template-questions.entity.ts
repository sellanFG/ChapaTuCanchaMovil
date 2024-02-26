import { ApiProperty } from '@nestjs/swagger';

export class TemplateQuestions {
  @ApiProperty()
  questionId: number;

  @ApiProperty()
  question: string;

  @ApiProperty()
  sportId: number;
}
