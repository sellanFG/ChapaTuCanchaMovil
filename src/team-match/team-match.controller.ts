import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TeamMatch } from '@prisma/client';
import { GetTeamMatch } from './entities/swagger/getTeamMatch.entity';
import { TeamMatchService } from './team-match.service';

@ApiTags('team-match')
@Controller('team-match')
export class TeamMatchController {
  constructor(private readonly teamMatchService: TeamMatchService) {}

  @Get(':id')
  @ApiOkResponse({ type: [GetTeamMatch] })
  getInfoNosFaltaUno(@Param('id') matchId: number): Promise<TeamMatch[]> {
    return this.teamMatchService.getNosFaltaUno(matchId);
  }
}
