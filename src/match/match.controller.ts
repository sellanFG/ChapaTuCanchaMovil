import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Match } from '@prisma/client';
import { CreateMatchDto } from './dto/create-match.dto';
import { MatchEntity } from './entities/match.entity';
import { MatchEntityPost } from './entities/swagger/match-create.entity';
import { MatchService } from './match.service';
@ApiTags('match')
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get()
  @ApiOkResponse({ type: [match] })
  getMatches(): Promise<match[]> {
    return this.matchService.getMatches();
  }

  @Get(':id')
  @ApiOkResponse({ type: match })
  @ApiParam({ name: 'id', description: 'Match id', type: 'number' })
  getMatchById(id: number): Promise<Match> {
    return this.matchService.getMatchById(id);
  }

  @Post()
  @ApiCreatedResponse({ type: MatchEntityPost })
  createMatch(@Body() data: CreateMatchDto): Promise<MatchEntityPost> {
    return this.matchService.create(data);
  }
}
