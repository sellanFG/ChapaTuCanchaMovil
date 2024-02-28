import { ApiProperty } from '@nestjs/swagger';

const arrayPreferences: Record<string, any>[] = [
  {
    questionId: 0,
    question: 'string',
    answerId: 0,
    answer: 'string',
  },
];

const preferences: Record<string, any> = {
  sportId: 0,
  sportImage: 'string',
  preferences: arrayPreferences,
};

export class PreferencesEntity {
  @ApiProperty({ enum: [preferences] })
  SportName: string;
}
