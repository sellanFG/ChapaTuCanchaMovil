import {ApiProperty} from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateMemberDto {
    
    @ApiProperty()
    @IsString()
    @MaxLength(1)
    @MinLength(1)
    @IsNotEmpty()
    memberRole: string

    @Transform(({ value }) => new Date(value))
    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    memberRegistrationDate: Date

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    memberStatus : boolean

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    playerId: number

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    teamId: number
}