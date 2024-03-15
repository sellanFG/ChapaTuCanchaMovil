import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsInstance,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { Transform, plainToInstance } from 'class-transformer';

export class Preference {
  constructor(sportId: number, answerId: number) {
    this.sportId = sportId;
    this.answerId = answerId;
  }

  sportId: number;
  answerId: number;
}

const preference: Record<string, any> = [
  {
    sportId: 1,
    answerId: 1,
  },
];

export class CreatePreferenceDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  playerId: number;

  @ApiProperty({ enum: [preference] })
  @IsArray()
  @ArrayNotEmpty()
  @Transform(({ value }) => {
    return value.map((v: any) => {
      const keys = Object.keys(v);
      if (
        keys.includes('sportId') &&
        keys.includes('answerId') &&
        typeof v['sportId'] === 'number' &&
        typeof v['answerId'] === 'number'
      ) {
        return plainToInstance(Preference, v);
      } else {
        return v;
      }
    });
  })
  @IsInstance(Preference, {
    each: true,
    message:
      'each value in preferences must be an instance of Preference: {sportId: number, answerId: number}',
  })
  preferences: Preference[];
}
