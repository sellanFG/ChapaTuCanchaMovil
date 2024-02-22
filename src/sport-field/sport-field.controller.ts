import { Controller } from '@nestjs/common';
import { SportFieldService } from './sport-field.service';

@Controller('sport-field')
export class SportFieldController {
  constructor(private readonly sportFieldService: SportFieldService) {}
}
