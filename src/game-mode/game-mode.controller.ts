import { Controller } from '@nestjs/common';
import { GameModeService } from './game-mode.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('game-mode')
@Controller('game-mode')
export class GameModeController {
  constructor(private readonly gameModeService: GameModeService) {}
}
