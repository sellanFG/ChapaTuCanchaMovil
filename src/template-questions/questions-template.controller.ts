import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { QuestionsTemplate } from '@prisma/client';
import { QuestionsTemplate as QuestionsTemplateEntity } from './entities/template-questions.entity';
import { QuestionsTemplateService } from './questions-template.service';

@ApiTags('template-questions')
@Controller('template-questions')
export class QuestionsTemplateController {
  constructor(
    private readonly templateQuestionsService: QuestionsTemplateService,
  ) {}

  @Get(':id')
  @ApiOkResponse({
    description: 'Get all questions for a sport',
    type: [QuestionsTemplateEntity],
  })
  @ApiParam({ name: 'id', description: 'Sport id', type: 'number' })
  async getAllQuestionsSportId(
    @Param('id') id: number,
  ): Promise<QuestionsTemplate[]> {
    return this.templateQuestionsService.getAllQuestionsSportId(id);
  }
}
