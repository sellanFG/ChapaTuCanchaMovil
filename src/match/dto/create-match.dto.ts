import {ApiProperty} from '@nestjs/swagger'
import { IsDate, IsNotEmpty, IsBoolean, IsNumber, IsOptional, IsString, Max, MaxLength } from 'class-validator';

export class CreateMatchDto {

    @IsDate()
    @IsNotEmpty()
    @ApiProperty()
    matchDate: Date;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty()
    matchTime: Date;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty()
    matchDistrict: string;

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
