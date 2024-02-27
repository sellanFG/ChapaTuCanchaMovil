import { Body, Controller, Get, Post,Param } from '@nestjs/common';
import { TeamService } from './team.service';
import { ApiOkResponse, ApiParam, ApiTags,ApiCreatedResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { Team } from '@prisma/client';
import { team } from './entities/team.entity';
import { CreateTeamDto, UpdateTeamDto } from './dto';

@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  @ApiOkResponse({type: [team]})
  getTeams(): Promise<Team[]> {
    return this.teamService.getTeams();
  }

  @Get(':id')
  @ApiOkResponse({type: team})
  @ApiParam({name: 'id', description: 'Team id', type: 'number'})
  getTeamById(id: number): Promise<Team> {
    return this.teamService.getTeamById(id);
  }

  @Get('sport/:id')
  @ApiOkResponse({type: [team]})
  @ApiParam({name: 'id', description: 'Sport id', type: 'number'})
  getTeamsBySport(id: number): Promise<Team[]> {
    return this.teamService.getTeamsBySport(id);
  }

  @Post()
  @ApiCreatedResponse({type: team})
  createTeam(@Body() data: CreateTeamDto): Promise<Team> {
    return this.teamService.createTeam(data);
  }

  @Post(':id')
  @ApiOkResponse({description: 'Team updated successfully'})
  @ApiParam({name: 'id', description: 'Team id', type: 'number'})
  updateTeam(@Body() data: UpdateTeamDto, @Param('id') id: number): Promise<Team> {
    return this.teamService.updateTeam(id, data);
  }

  @Post(':id')
  @ApiNoContentResponse({description: 'Team deleted successfully'})
  @ApiParam({name: 'id', description: 'Team id', type: 'number'})
  deleteTeam(@Param('id') id: number): Promise<Team> {
    return this.teamService.deleteTeam(id);
  }
}
