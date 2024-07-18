import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Team } from '@prisma/client';
import { triggerAsyncId } from 'async_hooks';
import { PrismaService } from 'src/prisma/prisma.service';
import { MembersEntity } from '../members/entities/members.entity';
import { CreateTeamDto, UpdateTeamDto } from './dto';
import { TeamEntity } from './entities/team.entity';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) { }

  getTeams() {
    return this.prisma.handleDbOperation(
      this.prisma.team.findMany({
        include: {
          sport: true,
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
          sport: true,
        },
      }),
    );
  }
  async create(data: CreateTeamDto): Promise<Team> {
    const teamData = new TeamEntity(
      data.name,
      data.logo,
      data.searchStatus,
      data.sportId,
      data.registrationDate,
    );
    const membersData = new MembersEntity(
      data.playerId,
      'P',
      data.registrationDate
    );

    return this.prisma.team.create({
      data: {
        ...teamData,
        members: {
          create: membersData,
        },
      },
      include: {
        sport: true,
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
          sport: true,
        },
      }),
    );
  }

  async deleteTeam(id: number) {
    try {
      const deleteMembers = this.prisma.member.deleteMany({
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
