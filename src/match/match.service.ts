import { Injectable, NotFoundException } from '@nestjs/common';
import { Match } from '@prisma/client';
import { GameModeService } from 'src/game-mode/game-mode.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SportFieldService } from 'src/sport-field/sport-field.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { SportService } from 'src/sport/sport.service';

@Injectable()
export class MatchService {

    constructor(
        private prisma: PrismaService, 
        private gamemode: GameModeService,
        private sportfield: SportFieldService,
        private sport: SportService) {}

    getMatches(): Promise<Match[]> {
        return this.prisma.handleDbOperation(this.prisma.match.findMany(
            {
                include: {
                    Sport: true,
                    GameMode: true,
                    SportField: true}}
        ));
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
        await this.sport.getSportById(data.SportId);
        await this.gamemode.getGameModeById(data.GameModeId);
        await this.sportfield.getSportFieldById(data.SportFieldId);
        const matchCreated = await this.prisma.handleDbOperation(
            this.prisma.match.create({
                data
            }));
        return matchCreated;
    }
}
