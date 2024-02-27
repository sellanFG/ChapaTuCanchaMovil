import {ApiProperty} from '@nestjs/swagger'

export class team {
    @ApiProperty()
    teamId: number;

    @ApiProperty()
    teamName: string;

    @ApiProperty()
    teamLogo: string;

    @ApiProperty()
    teamRegistrationDate: Date;

    @ApiProperty()
    teamSearchStatus: string;

    @ApiProperty()
    SportId: number;
}
    