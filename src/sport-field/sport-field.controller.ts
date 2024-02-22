import { Controller } from '@nestjs/common';
import { SportFieldService } from './sport-field.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sport-field')
@Controller('sport-field')
export class SportFieldController {
  constructor(private readonly sportFieldService: SportFieldService) {}
}
