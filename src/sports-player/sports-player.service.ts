import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SportsPlayerEntity } from './entities/sports-player.entity';

@Injectable()
export class SportsPlayerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    playerId: number,
    sportsId: number[],
  ): Promise<SportsPlayerEntity[]> {
    await this.prisma.handleDbOperation(
      this.prisma.sportPlayer.createMany({
        data: sportsId.map((sportId) => ({
          playerId,
          sportId,
        })),
      }),
    );

    return this.getAllSportsPlayer(playerId, sportsId);
  }

  async getAllSportsPlayer(
    id: number,
    sportIds?: number[],
  ): Promise<SportsPlayerEntity[]> {
    return this.prisma.handleDbOperation(
      this.prisma.sportPlayer.findMany({
        where: {
          playerId: id,
          sportId: {
            in: sportIds,
          },
        },
        include: {
          Sport: {
            select: {
              sportName: true,
              sportDescription: true,
              sportImage: true,
            },
          },
        },
      }),
    );
  }

  async delete(playerId: number, sportId: number): Promise<void> {
    //Verify the teams registered with the same sport
    if (await this.someTeam(sportId, playerId)) {
      throw new HttpException(
        'You cannot delete the sport because at least one of your teams identifies with it',
        HttpStatus.CONFLICT,
      );
    }
    try {
      //cascading delete: delete the sportPlayer row and player preferences
      await this.prisma.sportPlayer.delete({
        where: {
          sportId_playerId: {
            playerId,
            sportId,
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.messages);
    }
  }

  private async someTeam(sportId: number, playerId: number): Promise<boolean> {
    return (
      (
        await this.prisma.team.findMany({
          where: {
            sportId,
            Members: {
              some: {
                playerId,
              },
            },
          },
        })
      ).length != 0
    );
  }
}
