import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SportsPlayerEntity } from './entities/sports-player.entity';

@Injectable()
export class SportsPlayerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    playerId: number,
    sportsId: number[],
  ): Promise<SportsPlayerEntity[]> {
    //Update sports registered
    const idsNotRegisters = await this.updateSportsRegistered(
      playerId,
      sportsId,
    );

    //New sports registers
    const registers = [];
    for (const sportId of idsNotRegisters) {
      registers.push({ playerId: playerId, SportId: sportId });
    }
    await this.prisma.handleDbOperation(
      this.prisma.sportPlayer.createMany({
        data: registers,
      }),
    );

    return this.getAllSportsPlayer(playerId, sportsId);
  }

  private async updateSportsRegistered(
    playerId: number,
    ids: number[],
  ): Promise<number[]> {
    const registers = await this.prisma.handleDbOperation(
      this.prisma.sportPlayer.findMany({
        where: {
          SportId: {
            in: ids,
          },
        },
      }),
    );
    //Update sports registered
    await this.updateMany(playerId, ids);

    const registeredIds = registers.map(
      (registered: any) => registered.SportId,
    );
    const setRegisters = new Set(registeredIds);
    return ids.filter((id) => !setRegisters.has(id));
  }

  async getAllSportsPlayer(id: number, sportIds?: number[]): Promise<any> {
    return this.prisma.handleDbOperation(
      this.prisma.sportPlayer.findMany({
        where: {
          playerId: id,
          status: true,
          SportId: {
            in: sportIds,
          },
        },
        include: {
          sport: {
            select: {
              SportName: true,
              SportDescription: true,
              SportImage: true,
            },
          },
        },
      }),
    );
  }

  private async updateMany(
    playerId: number,
    sportIds: number[],
  ): Promise<void> {
    await this.prisma.handleDbOperation(
      this.prisma.sportPlayer.updateMany({
        where: {
          playerId: playerId,
          SportId: {
            in: sportIds,
          },
        },
        data: {
          status: true,
        },
      }),
    );
  }

  async update(id: number, sportId: number): Promise<void> {
    await this.prisma.handleDbOperation(
      this.prisma.sportPlayer.update({
        where: {
          SportId_playerId: {
            playerId: id,
            SportId: sportId,
          },
        },
        data: {
          status: false,
        },
      }),
    );
  }
}
