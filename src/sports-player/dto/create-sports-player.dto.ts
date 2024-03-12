import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateSportsPlayerDto {
  @ApiProperty({ description: 'Player id' })
  @IsNumber()
  @IsNotEmpty()
  playerId: number;

  @ApiProperty({ type: [Number], description: 'Array of sports IDs' })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  sportsId: number[];
}
