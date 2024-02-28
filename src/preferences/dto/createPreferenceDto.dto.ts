import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePreferenceDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  playerId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  answerId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  sportId: number;
}
