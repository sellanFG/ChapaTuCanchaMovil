import { Injectable } from '@nestjs/common';
import { TeamMatch } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamMatchService {
  constructor(private prisma: PrismaService) { }

  getNosFaltaUno(matchId: number): Promise<TeamMatch[]> {
    return this.prisma.teamMatch.findMany({
      where: {
        matchId: matchId,
      },
      include: {
        player: {
          select: {
            playerId: true,
            userName: true,
            image: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  getAllTeamMatchByMatchId(matchId: number): Promise<TeamMatch[]> {
    return this.prisma.teamMatch.findMany({
      where: {
        matchId,
      },
      include: {
        team: {
          select: {
            teamId: true,
            name: true,
            logo: true,
          },
        },
      },
    });
  }
}
