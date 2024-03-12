import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreatePreferenceDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  playerId: number;

  @ApiProperty({ type: [Number] })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  answerIds: number[];
}
