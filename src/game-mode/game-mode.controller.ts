import { Controller, Get } from '@nestjs/common';
import { GameModeService } from './game-mode.service';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { GameMode } from '@prisma/client';
import { gameMode } from './entities/game-mode.entity';

@ApiTags('game-mode')
@Controller('game-mode')
export class GameModeController {
  constructor(private readonly gameModeService: GameModeService) {}

  @Get()
  @ApiOkResponse({ type: [gameMode] })
  getGameModes(): Promise<GameMode[]>{
    return this.gameModeService.getGameModes();
  }

  @Get(':id')
  @ApiOkResponse({ type: gameMode })
  @ApiParam({ name: 'id', description: 'Game mode id', type: 'number' })
  getGameModeById(id: number) : Promise<GameMode>{
    return this.gameModeService.getGameModeById(id);
  }

  @Get('sport/:id')
  @ApiOkResponse({ type: [gameMode] })
  @ApiParam({ name: 'id', description: 'Sport id', type: 'number' })
  getGameModesBySportId(id: number) : Promise<GameMode[]>{
    return this.gameModeService.getGameModesBySportId(id);
  }
}
