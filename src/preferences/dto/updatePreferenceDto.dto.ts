import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePreferenceDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  playerId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  sportId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  answerId: number;
}
