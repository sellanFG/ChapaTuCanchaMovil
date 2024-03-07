import { Injectable } from '@nestjs/common';
import { TeamMatch } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TeamMatchEntity } from './entities/team-match.entity';

@Injectable()
export class TeamMatchService {
  constructor(private prisma: PrismaService) {}

  getNosFaltaUno(matchId: number) {
    return this.prisma.handleDbOperation(
      this.prisma.teamMatch.findMany({
        where: {
          matchId: matchId,
        },
        include: {
          Player: {
            select: {
              playerId: true,
              playerUserName: true,
              playerImage: true,
              playerFirstName: true,
              playerLastName: true,
            },
          },
        },
      }),
    );
  }

  getAllTeamMatchByMatchId(matchId: number): Promise<TeamMatch[]> {
    return this.prisma.teamMatch.findMany({
      where: {
        matchId,
      },
      include: {
        Team: {
          select: {
            teamId: true,
            teamName: true,
            teamLogo: true,
          },
        },
      },
    });
  }

  createMany(data: TeamMatchEntity[]) {
    return this.prisma.handleDbOperation(
      this.prisma.teamMatch.createMany({
        data,
      }),
    );
  }
}
