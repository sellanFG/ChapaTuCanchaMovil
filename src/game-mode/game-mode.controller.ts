import { Controller } from '@nestjs/common';
import { GameModeService } from './game-mode.service';

@Controller('game-mode')
export class GameModeController {
  constructor(private readonly gameModeService: GameModeService) {}
}
