import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateSportsPlayerDto {
  @ApiProperty({ description: 'Player id' })
  @IsNumber()
  @IsNotEmpty()
  playerId: number;

  @ApiProperty({ type: [Number], description: 'Array of sports IDs' })
  @IsNotEmpty()
  @IsArray()
  sportsId: number[];
}
