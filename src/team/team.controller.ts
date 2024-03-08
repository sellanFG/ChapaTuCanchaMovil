import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Team } from '@prisma/client';
import { SportService } from 'src/sport/sport.service';
import { CreateTeamDto, UpdateTeamDto } from './dto';
import { GetTeam, PostTeam } from './entities/swagger/index';
import { TeamService } from './team.service';

@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    private readonly sportService: SportService,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetTeam] })
  getTeams(): Promise<Team[]> {
    return this.teamService.getTeams();
  }

  @Get(':id')
  @ApiOkResponse({ type: GetTeam })
  @ApiParam({ name: 'id', description: 'Team id', type: 'number' })
  getTeamById(@Param('id') id: number): Promise<Team> {
    return this.teamService.getTeamById(id);
  }

  @Get('sport/:id')
  @ApiOkResponse({ type: [GetTeam] })
  @ApiParam({ name: 'id', description: 'Sport id', type: 'number' })
  async getTeamsBySport(id: number): Promise<Team[]> {
    await this.sportService.getSportById(id);
    return this.teamService.getTeamsBySport(id);
  }

  @Post()
  @ApiCreatedResponse({ type: PostTeam })
  async create(@Body() data: CreateTeamDto): Promise<Team> {
    await this.sportService.getSportById(data.sportId);
    return this.teamService.create(data);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Team updated successfully' })
  @ApiParam({ name: 'id', description: 'Team id', type: 'number' })
  updateTeam(
    @Body() data: UpdateTeamDto,
    @Param('id') id: number,
  ): Promise<Team> {
    return this.teamService.updateTeam(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({
    description: 'Team deleted successfully',
  })
  @ApiParam({ name: 'id', description: 'Team id', type: 'number' })
  async deleteTeam(@Param('id') id: number) {
    await this.teamService.deleteTeam(id);
  }
}
