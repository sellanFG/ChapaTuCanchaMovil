import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetSport } from './entities/swagger/getSport.entity';
import { SportService } from './sport.service';

@ApiTags('sport')
@Controller('sport')
export class SportController {
  constructor(private readonly sportService: SportService) {}

  @Get()
  @ApiOkResponse({ type: [GetSport] })
  getSports() {
    return this.sportService.getSports();
  }

  @Get(':id')
  @ApiOkResponse({ type: GetSport })
  @ApiParam({ name: 'id', description: 'Sport id', type: 'number' })
  getSportById(id: number) {
    return this.sportService.getSportById(id);
  }
}
