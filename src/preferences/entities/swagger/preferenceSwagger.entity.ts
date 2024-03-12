import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayPreferences,
  PreferencesInterface,
} from '../../interfaces/preferences.interface';

const arrayPreferences: ArrayPreferences[] = [
  {
    questionId: 0,
    question: 'string',
    answerId: 0,
    answer: 'string',
  },
];

export class PreferencesEntitySwagger implements PreferencesInterface {
  @ApiProperty()
  sportId: number;
  @ApiProperty()
  sportName: string;
  @ApiProperty()
  sportImage: string;
  @ApiProperty({ enum: [arrayPreferences] })
  preferences: ArrayPreferences[];
}
