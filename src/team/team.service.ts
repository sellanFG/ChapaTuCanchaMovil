import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Team } from '@prisma/client';
import { triggerAsyncId } from 'async_hooks';
import { PrismaService } from 'src/prisma/prisma.service';
import { MembersEntity } from '../members/entities/members.entity';
import { CreateTeamDto, UpdateTeamDto } from './dto';
import { TeamEntity } from './entities/team.entity';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  getTeams() {
    return this.prisma.handleDbOperation(
      this.prisma.team.findMany({
        include: {
          Sport: true,
        },
      }),
    );
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
    return this.prisma.handleDbOperation(
      this.prisma.team.findMany({
        where: {
          sportId: sportId,
        },
        include: {
          Sport: true,
        },
      }),
    );
  }
  async create(data: CreateTeamDto): Promise<Team> {
    const teamData = new TeamEntity(
      data.teamName,
      data.teamLogo,
      data.teamSearchStatus,
      data.sportId,
      data.teamRegistrationDate,
    );
    const membersData = new MembersEntity(
      data.playerId,
      'P',
      data.teamRegistrationDate,
    );

    return this.prisma.team.create({
      data: {
        ...teamData,
        Members: {
          create: membersData,
        },
      },
      include: {
        Sport: true,
      },
    });
  }

  async updateTeam(id: number, data: UpdateTeamDto): Promise<Team> {
    return this.prisma.handleDbOperation(
      this.prisma.team.update({
        where: {
          teamId: id,
        },
        data,
        include: {
          Sport: true,
        },
      }),
    );
  }

  async deleteTeam(id: number) {
    try {
      const deleteMembers = this.prisma.members.deleteMany({
        where: {
          teamId: id,
        },
      });
      const deleteTeam = this.prisma.team.delete({
        where: {
          teamId: id,
        },
      });

      await this.prisma.$transaction([deleteMembers, deleteTeam]);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
