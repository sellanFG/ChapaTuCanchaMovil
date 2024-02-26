import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { TeamplateQuestions } from '@prisma/client';
import { TemplateQuestions } from './entities/template-questions.entity';
import { TemplateQuestionsService } from './template-questions.service';

@ApiTags('template-questions')
@Controller('template-questions')
export class TemplateQuestionsController {
  constructor(
    private readonly templateQuestionsService: TemplateQuestionsService,
  ) {}

  @Get(':id')
  @ApiOkResponse({
    description: 'Get all questions for a sport',
    type: [TemplateQuestions],
  })
  @ApiParam({ name: 'id', description: 'Sport id', type: 'number' })
  async getAllQuestionsSportId(
    @Param('id') id: number,
  ): Promise<TeamplateQuestions[]> {
    return this.templateQuestionsService.getAllQuestionsSportId(id);
  }
}
