import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from 'src/match/dto/create-match.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PLUSDAYS } from '../utils/constants';
import { MembersMatchEntity } from './entities/members-match.entity';
@Injectable()
export class MembersMatchService {
  constructor(private readonly prisma: PrismaService) {}

  createMany(data: MembersMatchEntity[]) {
    return this.prisma.handleDbOperation(
      this.prisma.membersMatch.createMany({
        data,
      }),
    );
  }

  async getEndTimeA(playerId: number) {
    const data = await this.getLastDateUserMatch(playerId);
    if (!data) {
      return null;
    }
    const { matchDate, matchTime } = data.Match;
    const date = new Date(matchDate + ' ' + matchTime);

    return new Date(date.setDate(date.getDate() + PLUSDAYS));
  }

  private getLastDateUserMatch(playerId: number) {
    return this.prisma.membersMatch.findFirst({
      where: {
        playerId,
      },
      orderBy: {
        Match: {
          matchDate: 'desc',
        },
      },
      select: {
        playerId: true,
        Match: {
          select: {
            matchDate: true,
            matchTime: true,
          },
        },
      },
    });
  }
}
