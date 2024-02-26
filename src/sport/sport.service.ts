import { Injectable, NotFoundException } from '@nestjs/common';
import { Sport } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class SportService {
  constructor(private prisma: PrismaService) {}

  async getSportById(id: number): Promise<Sport> {
    const sport = await this.prisma.handleDbOperation(
      this.prisma.sport.findUnique({
        where: {
          SportId: id,
        },
      }),
    );

    if (!sport) {
      throw new NotFoundException(`Sport with id ${id} not found`);
    }

    return sport;
  }

  async validateSports(ids: number[]): Promise<number[]> {
    const foundSports = await this.prisma.handleDbOperation(
      this.prisma.sport.findMany({
        where: {
          SportId: {
            in: ids,
          },
        },
      }),
    );

    const badIds = [];
    if (foundSports.length != ids.length) {
      let i = 0,
        j = 0;
      while (i < foundSports.length && j < ids.length) {
        const sportId = (await foundSports[i]).SportId;
        const id = ids[j];

        if (sportId == id) {
          i++;
          j++;
        } else {
          badIds.push(id);
          j++;
        }
      }

      for (let i = j; i < ids.length; i++) {
        badIds.push(ids[i]);
      }
    }
    return badIds;
  }
}
