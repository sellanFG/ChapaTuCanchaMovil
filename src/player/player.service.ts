import { Injectable } from '@nestjs/common';
import { player } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlayerDto,UpdatePlayerDto } from './dto';

@Injectable()
export class PlayerService {

    constructor(private prisma: PrismaService){}

    async getPlayers(): Promise<player[]>{
        return this.prisma.player.findMany();
    }

    async getPlayerById(id: number): Promise<player>{
        return this.prisma.player.findUnique({
            where: {playerId: id}
        });
    }

    async createPlayer(data: CreatePlayerDto): Promise<player>{
        return this.prisma.player.create({ data });
    }

    async updatePlayer(id: number, data: UpdatePlayerDto): Promise<player>{
        return this.prisma.player.update({
            where: {playerId: id},
            data
        });
    }

    async deletePlayer(id: number): Promise<player>{
        return this.prisma.player.delete({
            where: {playerId: id}
        });
    }
}
