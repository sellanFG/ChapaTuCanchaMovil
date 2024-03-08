import { Injectable, NotFoundException } from '@nestjs/common';
import { Sport } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SportService {
  constructor(private prisma: PrismaService) {}

  async getSportById(id: number): Promise<Sport> {
    const sport = await this.prisma.sport.findUnique({
      where: {
        sportId: id,
      },
    });

    if (!sport) {
      throw new NotFoundException(`Sport with id ${id} not found`);
    }

    return sport;
  }

  async validateSports(ids: number[]): Promise<void> {
    try {
      const foundSports = await this.prisma.sport.findMany({
        where: {
          sportId: {
            in: ids,
          },
        },
      });

      const foundIds = new Set(foundSports.map((sport) => sport.sportId));
      const badIds = ids.filter((id) => !foundIds.has(id));
      if (badIds.length != 0) {
        throw new NotFoundException(`Invalid ids: ${badIds.join(', ')}`);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getSports(): Promise<Sport[]> {
    return this.prisma.sport.findMany();
  }
}
