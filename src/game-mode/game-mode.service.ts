import { Injectable, NotFoundException } from '@nestjs/common';
import { GameMode } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SportService } from 'src/sport/sport.service';

@Injectable()
export class GameModeService {
  constructor(
    private prisma: PrismaService,
    private sportService: SportService,
  ) {}

  async getGameModes(): Promise<GameMode[]> {
    return await this.prisma.handleDbOperation(this.prisma.gameMode.findMany());
  }

  async getGameModesBySportId(sportId: number): Promise<GameMode[]> {
    await this.sportService.getSportById(sportId);

    return this.prisma.handleDbOperation(
      this.prisma.gameMode.findMany({
        where: {
          sportId: sportId,
        },
      }),
    );
  }

  async getGameModeById(id: number): Promise<GameMode> {
    const gameMode = await this.prisma.handleDbOperation(
      this.prisma.gameMode.findUnique({
        where: {
          gameModeId: id,
        },
      }),
    );
    if (!gameMode) {
      throw new NotFoundException(`GameMode with id ${id} not found`);
    }
    return gameMode;
  }
}
