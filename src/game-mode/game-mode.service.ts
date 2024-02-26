import { Injectable, NotFoundException } from '@nestjs/common';
import { GameMode } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SportService } from 'src/sport/sport.service';

@Injectable()
export class GameModeService {
    constructor (private prisma: PrismaService, private sportService: SportService) {}

    async getGameModes() : Promise<GameMode[]>{
        const gameModes = await this.prisma.handleDbOperation(
            this.prisma.gameMode.findMany(),
        );
        return gameModes;

    }

    async getGameModesBySportId(sportId: number) : Promise<GameMode[]> {
        await this.sportService.getSportById(sportId);

        return this.prisma.handleDbOperation(
            this.prisma.gameMode.findMany({
                where: {
                    SportId: sportId,
                },
            }),
        );        
    }

    async getGameModeById(id: number) : Promise<GameMode> {
        const gameMode = await this.prisma.handleDbOperation(
            this.prisma.gameMode.findUnique({
                where: {
                    GameModeId: id,
                },
            }),
        );
        if (!gameMode) {
            throw new NotFoundException(`GameMode with id ${id} not found`);
        }
        return gameMode;
    }
}
