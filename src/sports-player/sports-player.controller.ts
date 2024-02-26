import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSportsPlayerDto, UpdateSportsPlayerDto } from './dto';
import { SportsPlayerService } from './sports-player.service';
import { SportsPlayerEntity } from './entities/sports-player.entity';
import { SportService } from '../sport/sport.service';
import { PlayerService } from '../player/player.service';

@ApiTags('sports-player')
@Controller('sports-player')
export class SportsPlayerController {
  constructor(
    private readonly sportsPlayerService: SportsPlayerService,
    private sportService: SportService,
    private playerService: PlayerService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: [SportsPlayerEntity] })
  async create(@Body() createSportsPlayerDto: CreateSportsPlayerDto) {
    //Verify if sports and player exist
    const { sportsId, playerId } = createSportsPlayerDto;
    await this.playerService.getPlayerById(playerId);
    await this.sportService.validateSports(sportsId);

    return this.sportsPlayerService.create(playerId, sportsId);
  }

  @Get(':id')
  @ApiOkResponse({ type: [SportsPlayerEntity] })
  @ApiParam({ name: 'id', description: 'Player id', type: Number })
  async getAllSportsPlayer(@Param('id') id: number) {
    //Verify if the player exists
    await this.playerService.getPlayerById(id);
    return this.sportsPlayerService.getAllSportsPlayer(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: [SportsPlayerEntity] })
  @ApiParam({ name: 'id', description: 'Player id', type: Number })
  async update(
    @Param('id') id: number,
    @Body() updateSportsPlayerDto: UpdateSportsPlayerDto,
  ): Promise<SportsPlayerEntity[]> {
    //Verify if sport and player exist
    const { sportId } = updateSportsPlayerDto;
    await this.playerService.getPlayerById(id);
    await this.sportService.getSportById(sportId);

    await this.sportsPlayerService.update(id, sportId);
    return this.sportsPlayerService.getAllSportsPlayer(id);
  }
}
