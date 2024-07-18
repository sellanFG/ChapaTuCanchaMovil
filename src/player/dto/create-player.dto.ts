import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString, MaxLength, MinDate, MinLength } from 'class-validator';

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
    email?: string;

    @IsDate()
    @IsNotEmpty()
    @MinDate(new Date(2009, 1, 1))
    @ApiProperty()
    birthDate: Date;

    @IsString()
    @IsNotEmpty()
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

    @IsDate()
    @IsNotEmpty()
    registrationDate: Date;

    @IsBoolean()
    @IsNotEmpty()
    availability: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    subscription: boolean;

    @IsBoolean()
    @IsNotEmpty()
    searchStatus: boolean;

}