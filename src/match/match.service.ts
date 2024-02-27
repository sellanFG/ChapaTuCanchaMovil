import { Injectable, NotFoundException } from '@nestjs/common';
import { Match } from '@prisma/client';
import { GameModeService } from 'src/game-mode/game-mode.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SportFieldService } from 'src/sport-field/sport-field.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { SportService } from 'src/sport/sport.service';
import { match } from './entities/match.entity';

@Injectable()
export class MatchService {
  constructor(
    private prisma: PrismaService,
    private gamemode: GameModeService,
    private sportfield: SportFieldService,
    private sport: SportService,
  ) {}

  getMatches(): Promise<match[]> {
    return this.prisma.handleDbOperation(
      this.prisma.match.findMany({
        select: {
          matchId: true,
          matchDate: true,
          matchTime: true,
          matchDistrict: true,
          matchRegistrationDate: true,
          stateField: true,
          Sport: {
            select: {
              sportName: true,
            },
          },
          GameMode: {
            select: {
              gameModeName: true,
            },
          },
          SportField: {
            select: {
              sportFieldName: true,
            },
          },
        },
      }),
    );
  }

  async getMatchById(id: number): Promise<Match> {
    const match = await this.prisma.handleDbOperation(
      this.prisma.match.findUnique({
        where: {
          matchId: id,
        },
      }),
    );
    if (!match) {
      throw new NotFoundException(`Match with id ${id} not found`);
    }
    return match;
  }

  async createMatch(data: CreateMatchDto): Promise<Match> {
    await this.sport.getSportById(data.sportId);
    await this.gamemode.getGameModeById(data.gameModeId);
    await this.sportfield.getSportFieldById(data.sportFieldId);
    return this.prisma.handleDbOperation(
      this.prisma.match.create({
        data,
      }),
    );
  }
}
