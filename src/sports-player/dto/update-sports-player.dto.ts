import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSportsPlayerDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  sportId: number;
}
