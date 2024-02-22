import { Controller } from '@nestjs/common';
import { TemplateQuestionsService } from './template-questions.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('template-questions')
@Controller('template-questions')
export class TemplateQuestionsController {
  constructor(private readonly templateQuestionsService: TemplateQuestionsService) {}
}
