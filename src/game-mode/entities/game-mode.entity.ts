import { ApiProperty } from "@nestjs/swagger";

export class gameMode {
    @ApiProperty()
    GameModeId: number;
    
    @ApiProperty()
    GameModeName: string;
    
    @ApiProperty()
    sportId: number;

    @ApiProperty()
    GameModeDescription: string;
}