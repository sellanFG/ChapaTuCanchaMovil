import { Controller } from '@nestjs/common';
import { TeamMatchService } from './team-match.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('team-match')
@Controller('team-match')
export class TeamMatchController {
  constructor(private readonly teamMatchService: TeamMatchService) {}
}
