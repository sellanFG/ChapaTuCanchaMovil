import { ApiProperty } from '@nestjs/swagger';

const answer: Record<string, any> = [
  {
    answerId: 1,
    answer: 'string',
  },
];
export class GetQuestionsTemplate {
  @ApiProperty()
  questionsTemplateId: number;
  @ApiProperty()
  question: string;
  @ApiProperty()
  sportId: number;
  @ApiProperty({ enum: { answer } })
  Answer: Record<string, any>;
}
