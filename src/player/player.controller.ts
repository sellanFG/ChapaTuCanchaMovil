import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { player } from '@prisma/client';
import { CreatePlayerDto, UpdatePlayerDto } from './dto';
import { PlayerService } from './player.service';

@ApiTags('player')
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  async getPlayers() {
    return this.playerService.getPlayers();
  }

  @Get(':id')
  async getPlayerById(@Param('id') id: string) {
    return this.playerService.getPlayerById(Number(id));
  }

  @Post()
  async createPlayer(@Body() data: CreatePlayerDto) {
    return this.playerService.createPlayer(data);
  }

  @Put(':id')
  async updatePlayer(@Param('id') id: number, @Body() data: UpdatePlayerDto) {
    return this.playerService.updatePlayer(id, data);
  }

  @Delete(':id')
  async deletePlayer(@Param('id') id: number) {
    return this.playerService.deletePlayer(id);
  }

  @Get('info/:id')
  async getPlayerInfo(@Param('id') id: number) {
    return this.playerService.getPlayerInfo(id);
  }
}
