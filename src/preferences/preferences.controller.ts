import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePreferenceDto } from './dto/createPreferenceDto.dto';

@ApiTags('preferences')
@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post()
  @ApiCreatedResponse({ type: CreatePreferenceDto })
  create(@Body() createPreferenceDto: CreatePreferenceDto) {
    return this.preferencesService.create(createPreferenceDto);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Player Id' })
  @ApiOkResponse()
  getPreferences(@Param('id') playerId: number): Promise<NonNullable<unknown>> {
    return this.preferencesService.getPreferences(playerId);
  }
}
