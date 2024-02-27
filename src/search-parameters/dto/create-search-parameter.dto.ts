import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSearchParameterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  searchParametersMatchDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  searchParametersMatchStartTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  searchParametersMatchEndTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  searchParametersDistrict: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  SportId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  GameModeId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  TeamId: number;
}
