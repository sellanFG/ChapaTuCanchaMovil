import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateMemberDto {

    @ApiProperty()
    @IsString()
    @MaxLength(1)
    @MinLength(1)
    @IsNotEmpty()
    role: string

    @Transform(({ value }) => new Date(value))
    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    registrationDate: Date

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    status: boolean

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    playerId: number

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    teamId: number
}