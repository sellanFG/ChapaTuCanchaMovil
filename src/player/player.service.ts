import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { player } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlayerDto, UpdatePlayerDto } from './dto';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}

  async getPlayers(): Promise<player[]> {
    const players = await this.prisma.handleDbOperation(
      this.prisma.player.findMany(),
    );
    return players;
  }

  async getPlayerById(id: number): Promise<player> {
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

  async createPlayer(data: CreatePlayerDto): Promise<player> {
  
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

  async updatePlayer(id: number, data: UpdatePlayerDto): Promise<player> {
    
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

  async deletePlayer(id: number): Promise<player> {
   
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

  async getPlayerInfo(id: number): Promise<any>{
    return this.prisma.handleDbOperation(this.prisma.player.findUnique({
      where:{
        playerId: id
      },
      select:{
        playerFirstName: true,
        playerLastName: true,
        playerPhoneNumber: true
      }
    }));
  }
}
