import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Player } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlayerDto, UpdatePlayerDto } from './dto';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}

  async getPlayers(): Promise<Player[]> {
    return await this.prisma.handleDbOperation(this.prisma.player.findMany());
  }

  async getPlayerById(id: number): Promise<Player> {
    const playerFound = await this.prisma.handleDbOperation(
      this.prisma.player.findUnique({
        where: { playerId: id },
      }),
    );

    if (!playerFound) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }

    return playerFound;
  }

  async createPlayer(data: CreatePlayerDto): Promise<Player> {
    const playerCreated = await this.prisma.handleDbOperation(
      this.prisma.player.create({
        data,
      }),
    );
    if (!playerCreated) {
      throw new BadRequestException(`Player not created`);
    }
    return playerCreated;
  }

  async updatePlayer(id: number, data: UpdatePlayerDto): Promise<Player> {
    const playerUpdated = await this.prisma.handleDbOperation(
      this.prisma.player.update({
        where: { playerId: id },
        data,
      }),
    );
    if (!playerUpdated) {
      throw new BadRequestException(`Player not updated`);
    }
    return playerUpdated;
  }

  async deletePlayer(id: number): Promise<Player> {
    const playerDeleted = await this.prisma.handleDbOperation(
      this.prisma.player.delete({
        where: { playerId: id },
      }),
    );
    if (!playerDeleted) {
      throw new BadRequestException(`Player not deleted`);
    }
    return playerDeleted;
  }

  async getPlayerInfo(id: number): Promise<any> {
    return this.prisma.handleDbOperation(
      this.prisma.player.findUnique({
        where: {
          playerId: id,
        },
        select: {
          playerFirstName: true,
          playerLastName: true,
          playerPhoneNumber: true,
        },
      }),
    );
  }
}
