import { Controller } from '@nestjs/common';
import { TeamService } from './team.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}
}
