import { Controller } from '@nestjs/common';
import { TemplateQuestionsService } from './template-questions.service';

@Controller('template-questions')
export class TemplateQuestionsController {
  constructor(private readonly templateQuestionsService: TemplateQuestionsService) {}
}
