import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSportsPlayerDto } from './dto/create-sports-player.dto';
import { SportsPlayerService } from './sports-player.service';
import { SportsPlayerEntity } from './entities/sports-player.entity';
import { SportService } from '../sport/sport.service';
import { PlayerService } from '../player/player.service';
import { SportsPlayerEntitySwagger } from './entities/swagger/sport-playerSwagger.entity';

@ApiTags('sports-player')
@Controller('sports-player')
export class SportsPlayerController {
  constructor(
    private readonly sportsPlayerService: SportsPlayerService,
    private sportService: SportService,
    private playerService: PlayerService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: [SportsPlayerEntitySwagger] })
  async create(
    @Body() createSportsPlayerDto: CreateSportsPlayerDto,
  ): Promise<SportsPlayerEntity[]> {
    //Verify if sports and player exist
    const { sportsId, playerId } = createSportsPlayerDto;
    await this.playerService.getPlayerById(playerId);
    await this.sportService.validateSports(sportsId);

    return this.sportsPlayerService.create(playerId, sportsId);
  }

  @Get(':id')
  @ApiOkResponse({ type: [SportsPlayerEntitySwagger] })
  @ApiParam({ name: 'id', description: 'Player id', type: Number })
  async getAllSportsPlayer(
    @Param('id') id: number,
  ): Promise<SportsPlayerEntity[]> {
    //Verify if the player exists
    await this.playerService.getPlayerById(id);
    return this.sportsPlayerService.getAllSportsPlayer(id);
  }

  @Delete(':playerId/:sportId')
  @HttpCode(204)
  @HttpCode(409)
  @ApiNoContentResponse({
    description: 'Deleted player sport and its preferences',
  })
  @ApiConflictResponse({
    description:
      "Deleting a sport is not allowed if at least one of the player's teams identifies with it",
  })
  async delete(
    @Param('playerId') playerId: number,
    @Param('sportId') sportId: number,
  ) {
    await this.sportsPlayerService.delete(playerId, sportId);
  }
}
