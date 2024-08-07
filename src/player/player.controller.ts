import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import bcrypt from 'bcrypt';
import { CreatePlayerDto, UpdatePlayerDto } from './dto';
import { UpdatePlayerAvailabilityDto } from './dto/update-player-availability.dto';
import { PlayerService } from './player.service';

@ApiTags('player')
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) { }

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
    const { password } = data;

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    data.password = hash;

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

  @Patch(':id')
  updatePlayerAvailability(
    @Param('id') id: number,
    @Body() data: UpdatePlayerAvailabilityDto,
  ) {
    return this.playerService.updatePlayerAvailability(id, data);
  }
}
