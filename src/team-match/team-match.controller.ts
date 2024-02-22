import { Controller } from '@nestjs/common';
import { TeamMatchService } from './team-match.service';

@Controller('team-match')
export class TeamMatchController {
  constructor(private readonly teamMatchService: TeamMatchService) {}
}
