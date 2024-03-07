import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMatchDto } from './dto/create-match.dto';
import { GetMatch } from './entities/swagger/getMatch.entity';
import { PostMatch } from './entities/swagger/postMatch';
import { MatchService } from './match.service';
@ApiTags('match')
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get()
  @ApiOkResponse({ type: [GetMatch] })
  getMatches(): Promise<GetMatch[]> {
    return this.matchService.getMatches();
  }

  @Get(':id')
  @ApiOkResponse({ type: GetMatch })
  @ApiParam({ name: 'id', description: 'Match id', type: 'number' })
  getMatchById(id: number): Promise<GetMatch> {
    return this.matchService.getMatchById(id);
  }

  @Post()
  @ApiCreatedResponse({ type: PostMatch })
  createMatch(@Body() data: CreateMatchDto): Promise<PostMatch> {
    return this.matchService.create(data);
  }
}
