import { Injectable } from '@nestjs/common';
import { match } from 'assert';
import { CreateMatchDto } from 'src/match/dto/create-match.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PLUSDAYS } from '../utils/constants';
import { MembersMatchEntity } from './entities/members-match.entity';
@Injectable()
export class MembersMatchService {
  constructor(private readonly prisma: PrismaService) { }

  createMany(data: MembersMatchEntity[]) {
    return this.prisma.handleDbOperation(
      this.prisma.matchMember.createMany({
        data,
      }),
    );
  }

  async getEndTimeA(playerId: number) {
    const data = await this.getLastDateUserMatch(playerId);
    if (!data) {
      return null;
    }
    const { date, time } = data.match;
    const matchDate = new Date(date + ' ' + time);

    return new Date(date.setDate(matchDate.getDate() + PLUSDAYS));
  }

  private getLastDateUserMatch(playerId: number) {
    return this.prisma.matchMember.findFirst({
      where: {
        playerId,
      },
      orderBy: {
        match: {
          date: 'desc',
        },
      },
      select: {
        playerId: true,
        match: {
          select: {
            date: true,
            time: true,
          },
        },
      },
    });
  }
}
