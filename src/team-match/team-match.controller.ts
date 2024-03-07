import { Controller, Get, Param } from '@nestjs/common';
import { TeamMatchService } from './team-match.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('team-match')
@Controller('team-match')
export class TeamMatchController {
  constructor(private readonly teamMatchService: TeamMatchService) {}

  @Get(':id')
  getInfoNosFaltaUno(@Param('id') matchId: number) {
    this.teamMatchService.getNosFaltaUno(matchId);
  }
}
