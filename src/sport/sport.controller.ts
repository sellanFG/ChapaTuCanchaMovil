import { Controller } from '@nestjs/common';
import { SportService } from './sport.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sport')
@Controller('sport')
export class SportController {
  constructor(private readonly sportService: SportService) {}
}
