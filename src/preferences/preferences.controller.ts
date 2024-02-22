import { Controller } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('preferences')
@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}
}
