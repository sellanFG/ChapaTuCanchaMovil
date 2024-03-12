import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePreferenceDto } from './dto/createPreferenceDto.dto';
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

  @Delete(':playerId/:answerId')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Preference deleted' })
  async delete(
    @Param('playerId') playerId: number,
    @Param('answerId') answerId: number,
  ): Promise<void> {
    await this.preferencesService.delete(playerId, answerId);
  }
}
