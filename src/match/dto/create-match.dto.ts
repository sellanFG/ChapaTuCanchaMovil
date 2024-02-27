import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMatchDto {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  matchDate: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  matchTime: Date;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty()
  matchDistrict: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  matchRegistrationDate: Date;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  stateField: boolean;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  sportId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  gameModeId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  sportFieldId: number;
}
