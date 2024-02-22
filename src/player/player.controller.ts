import { Controller } from '@nestjs/common';
import { PlayerService } from './player.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('player')
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}
}
