import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateSportsPlayerDto, UpdateSportsPlayerDto } from './dto';
import { SportsPlayerPost } from './entities/sports-player-post.entity';
import { SportsPlayer } from './entities/sports-player.entity';
import { SportsPlayerService } from './sports-player.service';

@ApiTags('sports-player')
@Controller('sports-player')
export class SportsPlayerController {
  constructor(private readonly sportsPlayerService: SportsPlayerService) {}

  @Post()
  @ApiCreatedResponse({ type: SportsPlayerPost })
  create(@Body() createSportsPlayerDto: CreateSportsPlayerDto) {
    return this.sportsPlayerService.create(createSportsPlayerDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: [SportsPlayer] })
  findOne(@Param('id') id: number) {
    return this.sportsPlayerService.findAllSportsPlayer(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSportsPlayerDto: UpdateSportsPlayerDto,
  ) {
    return this.sportsPlayerService.update(+id, updateSportsPlayerDto);
  }

  @Delete(':playerId/:sportId')
  remove(
    @Param('playerId') playerId: number,
    @Param('sportId') sportId: number,
  ) {
    // return this.sportsPlayerService.remove(+id);
  }
}
