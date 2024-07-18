import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTeamDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  playerId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  logo: string;

  @Transform(({ value }) => new Date(value))
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  registrationDate: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1)
  @MinLength(1)
  searchStatus: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  sportId: number;
}
