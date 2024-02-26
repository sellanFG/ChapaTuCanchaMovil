import { Body, Controller, Get, Post } from '@nestjs/common';
import { MatchService } from './match.service';
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { match } from './entities/match.entity';
import { Match } from '@prisma/client';
import { CreateMatchDto } from './dto/create-match.dto';

@ApiTags('match')
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get()
  @ApiOkResponse({type: [match]})
  getMatches(): Promise<Match[]>{
    return this.matchService.getMatches();
  }

  @Get(':id')
  @ApiOkResponse({type: match})
  @ApiParam({name: 'id', description: 'Match id', type: 'number'})
  getMatchById(id: number): Promise<Match>{
    return this.matchService.getMatchById(id);
  }

  @Post()
  @ApiCreatedResponse({type: match})
  createMatch(@Body() data: CreateMatchDto): Promise<Match>{
    return this.matchService.createMatch(data);
  }
}
