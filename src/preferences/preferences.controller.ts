import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePreferenceDto } from './dto/createPreferenceDto.dto';
import { PreferencesEntity } from './entities/preferences.entity';

@ApiTags('preferences')
@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post()
  @ApiCreatedResponse({ type: PreferencesEntity })
  create(@Body() createPreferenceDto: CreatePreferenceDto) {
    return this.preferencesService.create(createPreferenceDto);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Player Id' })
  @ApiOkResponse({ type: PreferencesEntity })
  getPreferences(@Param('id') playerId: number): Promise<NonNullable<unknown>> {
    return this.preferencesService.getPreferences(playerId);
  }

  @Delete(':playerId/:sportId/:answerId')
  @ApiOkResponse({ type: PreferencesEntity })
  delete(
    @Param('playerId') playerId: number,
    @Param('sportId') sportId: number,
    @Param('answerId') answerId: number,
  ) {
    return this.preferencesService.delete(playerId, sportId, answerId);
  }
}
