import {ApiProperty} from '@nestjs/swagger'
import { IsDate, IsNotEmpty, IsBoolean, IsNumber, IsOptional, IsString, Max, MaxLength } from 'class-validator';
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
    SportId: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    GameModeId: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    SportFieldId: number;

}
