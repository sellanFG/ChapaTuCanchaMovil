import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTeamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  teamName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  teamLogo: string;

  @Transform(({ value }) => new Date(value))
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  teamRegistrationDate: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1)
  @MinLength(1)
  teamSearchStatus: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  sportId: number;
}
