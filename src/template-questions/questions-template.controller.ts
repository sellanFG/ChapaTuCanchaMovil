import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QuestionsTemplate } from '@prisma/client';
import { GetQuestionsTemplate } from './entities/swagger/get.entity';
import { QuestionsTemplateService } from './questions-template.service';

@ApiTags('template-questions')
@Controller('template-questions')
export class QuestionsTemplateController {
  constructor(
    private readonly templateQuestionsService: QuestionsTemplateService,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Get all questions',
    type: [GetQuestionsTemplate],
  })
  async getAllQuestionsSportId(): Promise<QuestionsTemplate[]> {
    return this.templateQuestionsService.getAll();
  }
}
