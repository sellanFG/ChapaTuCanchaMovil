import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxDate,
    MaxLength,
    MinDate,
    MinLength,
} from 'class-validator';

export class CreatePlayerDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @ApiProperty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    password: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @ApiProperty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @ApiProperty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(9)
    @MinLength(9)
    @ApiProperty()
    phoneNumber: string;

    @IsEmail()
    @IsOptional()
    @MaxLength(100)
    @ApiProperty()
    email: string;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    @IsNotEmpty()
    @MaxDate(new Date(new Date().getFullYear() - 18, 12, 31))
    @MinDate(new Date(1940, 1, 1))
    birthDate: Date;


    @IsString()
    @IsOptional()
    @MaxLength(255)
    image: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @ApiProperty()
    gender: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty()
    district: string;
}
