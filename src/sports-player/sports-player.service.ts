import { Injectable, NotFoundException } from '@nestjs/common';
import { sportPlayer } from '@prisma/client';
import { PlayerService } from 'src/player/player.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SportService } from 'src/sport/sport.service';
import { CreateSportsPlayerDto, UpdateSportsPlayerDto } from './dto';

@Injectable()
export class SportsPlayerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sportService: SportService,
    private readonly playerService: PlayerService,
  ) {}

  async create(
    createSportsPlayerDto: CreateSportsPlayerDto,
  ): Promise<sportPlayer> {
    const { sportsId, playerId } = createSportsPlayerDto;

    await this.playerService.getPlayerById(playerId);

    const badIds = await this.sportService.validateSports(sportsId);

    if (badIds.length != 0) {
      throw new NotFoundException(`Invalid ids: ${badIds.join(', ')}`);
    }

    const registers = [];
    for (const sportId of sportsId) {
      registers.push({ playerId: playerId, SportId: sportId });
    }

    return this.prisma.handleDbOperation(
      this.prisma.sportPlayer.createMany({
        data: registers,
        skipDuplicates: true,
      }),
    );
  }

  async findAllSportsPlayer(id: number) {
    await this.playerService.getPlayerById(id);

    return this.prisma.handleDbOperation(
      this.prisma.sportPlayer.findMany({
        where: {
          playerId: id,
        },
      }),
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} sportsPlayer`;
  }

  update(id: number, updateSportsPlayerDto: UpdateSportsPlayerDto) {
    return `This action updates a #${id} sportsPlayer`;
  }

  remove(id: number) {
    return `This action removes a #${id} sportsPlayer`;
  }
}
