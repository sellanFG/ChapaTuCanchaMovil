import { Controller,Get, Post, Put, Delete, Param ,Body,NotFoundException } from '@nestjs/common';
import { PlayerService } from './player.service';
import { ApiTags } from '@nestjs/swagger';
import { player } from '@prisma/client';
import { CreatePlayerDto,UpdatePlayerDto } from './dto';

@ApiTags('player')
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  async getPlayers(){
    return this.playerService.getPlayers();
  }

  @Get(':id')
    async getPlayerById(@Param('id') id: string){
      const playerFound = await this.playerService.getPlayerById(Number(id))
      if(!playerFound){
        throw new NotFoundException(`Player with ID ${id} not found`);
      }
      return playerFound;
    }
  
  @Post()
    async createPlayer(@Body() data: CreatePlayerDto){
      return this.playerService.createPlayer(data);
    }

  @Put(':id')
    async updatePlayer(@Param('id') id: number, @Body() data: UpdatePlayerDto){
      return this.playerService.updatePlayer(id, data);
    }
  
  @Delete(':id')              
    async deletePlayer(@Param('id') id: number){
      return this.playerService.deletePlayer(id);
    }
}
