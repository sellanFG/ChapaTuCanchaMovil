import {ApiProperty} from '@nestjs/swagger'

export class match {
    @ApiProperty()
    matchId: number;

    @ApiProperty()
    matchDate: Date;

    @ApiProperty()
    matchTime: Date;

    @ApiProperty()
    matchDistrict: string;

    @ApiProperty()
    matchRegistrationDate: Date;

    @ApiProperty()
    stateField: boolean;

    @ApiProperty()
    sportId: number;

    @ApiProperty()
    gameModeId: number;

    @ApiProperty()
    SportFieldId: number;
    

}
