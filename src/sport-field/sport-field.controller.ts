import { Controller, Get } from '@nestjs/common';
import { SportFieldService } from './sport-field.service';
import { ApiTags,ApiOkResponse,ApiParam } from '@nestjs/swagger';
import { sportField } from './entities/sport-field.entity';

@ApiTags('sport-field')
@Controller('sport-field')
export class SportFieldController {
  constructor(private readonly sportFieldService: SportFieldService) {}

  @Get()
  @ApiOkResponse({ type: [sportField] })
  getSportFields(): Promise<sportField[]>{
    return this.sportFieldService.getSportFields();
  }

  @Get(':id')
  @ApiOkResponse({ type: sportField })
  @ApiParam({ name: 'id', description: 'Sport field id', type: 'number' })
  getSportFieldById(id: number) : Promise<sportField>{
    return this.sportFieldService.getSportFieldById(id);
  }
}
