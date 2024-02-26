import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Sport } from './entities/sport.entity';
import { SportService } from './sport.service';

@ApiTags('sport')
@Controller('sport')
export class SportController {
  constructor(private readonly sportService: SportService) {}

  @Get()
  @ApiOkResponse({ type: [Sport] })
  getSports() {
    return this.sportService.getSports();
  }

  @Get(':id')
  @ApiOkResponse({ type: [Sport] })
  @ApiParam({ name: 'id', description: 'Sport id', type: 'number' })
  getSportById(id: number) {
    return this.sportService.getSportById(id);
  }
}
