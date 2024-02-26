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

  async validateSports(ids: number[]): Promise<void> {
    const foundSports = await this.prisma.handleDbOperation(
      this.prisma.sport.findMany({
        where: {
          SportId: {
            in: ids,
          },
        },
      }),
    );

    const foundIds = new Set(foundSports.map((sport) => sport.SportId));
    const badIds = ids.filter((id) => !foundIds.has(id));
    if (badIds.length != 0) {
      throw new NotFoundException(`Invalid ids: ${badIds.join(', ')}`);
    }
  }

  async getSports(): Promise<Sport[]> {
    return this.prisma.handleDbOperation(this.prisma.sport.findMany());
  }
}
