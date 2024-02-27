import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SportService } from 'src/sport/sport.service';
import { CreateTeamDto, UpdateTeamDto } from './dto';
import { Team } from '@prisma/client';

@Injectable()
export class TeamService {
  constructor(
    private prisma: PrismaService,
    private sport: SportService,
  ) {}

  getTeams() {
    return this.prisma.handleDbOperation(this.prisma.team.findMany());
  }

  getTeamById(id: number) {
    return this.prisma.handleDbOperation(
      this.prisma.team.findUnique({
        where: {
          teamId: id,
        },
      }),
    );
  }

  async getTeamsBySport(sportId: number) {
    await this.sport.getSportById(sportId);
    return this.prisma.handleDbOperation(
      this.prisma.team.findMany({
        where: {
          sportId: sportId,
        },
      }),
    );
  }

  async createTeam(data: CreateTeamDto): Promise<Team> {
    await this.sport.getSportById(data.sportId);
    return this.prisma.handleDbOperation(this.prisma.team.create({ data }));
  }

  async updateTeam(id: number, data: UpdateTeamDto): Promise<Team> {
    await this.sport.getSportById(data.sportId);
    return this.prisma.handleDbOperation(
      this.prisma.team.update({
        where: {
          teamId: id,
        },
        data,
      }),
    );
  }

  deleteTeam(id: number) {
    return this.prisma.handleDbOperation(
      this.prisma.team.delete({
        where: {
          teamId: id,
        },
      }),
    );
  }
}
