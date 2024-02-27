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
    Sport: {
        SportName: string;
    }

    @ApiProperty()
    GameMode: {
        GameModeName: string;
      };

    @ApiProperty()
    SportField: {
        sportFieldName: string;
      };
    

}
