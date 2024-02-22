import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength,IsEmpty, MinDate, IsBoolean, IsOptional } from 'class-validator';

export class CreatePlayerDto {
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @ApiProperty()
    playerUserName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    playerPassword: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @ApiProperty()
    playerFirstName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @ApiProperty()
    playerLastName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(9)
    @MinLength(9)
    @ApiProperty()
    playerPhoneNumber: string;

    @IsEmail()
    @IsOptional()
    @MaxLength(100)
    @ApiProperty()
    playerEmail?: string;

    @IsDate()
    @IsNotEmpty()
    @MinDate(new Date(2009,1,1))
    @ApiProperty()
    playerBirthDate: Date;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    playerImage: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @ApiProperty()
    playerGender: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty()
    playerDistrict: string;

    @IsDate()
    @IsNotEmpty()
    playerRegistrationDate: Date;

    @IsBoolean()
    @IsNotEmpty()
    playerAvailability: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    playerSubscription: boolean;

    @IsBoolean()
    @IsNotEmpty()
    playerSearchStatus: boolean;

}