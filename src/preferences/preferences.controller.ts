import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePreferenceDto, UpdatePreferenceDto } from './dto/index';
import { PreferencesEntitySwagger } from './entities/swagger/preferenceSwagger.entity';
import { PreferencesInterface } from './interfaces/preferences.interface';

@ApiTags('preferences')
@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post()
  @ApiCreatedResponse({ type: [PreferencesEntitySwagger] })
  create(
    @Body() createPreferenceDto: CreatePreferenceDto,
  ): Promise<PreferencesInterface[]> {
    return this.preferencesService.create(createPreferenceDto);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Player Id' })
  @ApiOkResponse({ type: [PreferencesEntitySwagger] })
  getPreferences(
    @Param('id') playerId: number,
  ): Promise<PreferencesInterface[]> {
    return this.preferencesService.getPreferences(playerId);
  }

  @Put(':id')
  @HttpCode(204)
  @ApiParam({ name: 'id', type: Number, description: 'Answer Id' })
  @ApiNoContentResponse()
  update(
    @Param('id') answerId: number,
    @Body() updatePreferenceDto: UpdatePreferenceDto,
  ) {
    return this.preferencesService.update(answerId, updatePreferenceDto);
  }
}
