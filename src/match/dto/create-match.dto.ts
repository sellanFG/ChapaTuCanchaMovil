import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateMatchDto {
  constructor(
    matchDate: Date,
    matchTime: Date,
    matchDistrict: string,
    matchRegistrationDate: Date,
    stateField: boolean,
    sportId: number,
    gameModeId: number,
    sportFieldId: number,
    teamId1: number,
    teamId2: number,
    usersId1: number[],
    usersId2: number[],
  ) {
    this.matchDate = matchDate;
    this.matchTime = matchTime;
    this.matchDistrict = matchDistrict;
    this.matchRegistrationDate = matchRegistrationDate;
    this.stateField = stateField;
    this.sportId = sportId;
    this.gameModeId = gameModeId;
    this.sportFieldId = sportFieldId;
    this.teamId1 = teamId1;
    this.teamId2 = teamId2;
    this.usersId1 = usersId1;
    this.usersId2 = usersId2;
  }
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
  @ApiProperty({ type: Number })
  sportFieldId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  teamId1: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  teamId2: number;

  @ApiProperty({ type: [Number], description: "Array of team2's user ids" })
  @IsArray()
  @IsNotEmpty()
  usersId1: number[];

  @ApiProperty({ type: [Number], description: "Array of team1's user ids" })
  @IsArray()
  @IsNotEmpty()
  usersId2: number[];
}
