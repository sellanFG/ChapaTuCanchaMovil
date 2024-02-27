import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Answer } from '@prisma/client';
import { AnswerService } from './answer.service';
import { AnswerEntity } from './entities/answer.entity';

@ApiTags('answer')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get()
  @ApiOkResponse({ type: [AnswerEntity] })
  getAll(): Promise<Answer[]> {
    return this.answerService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: AnswerEntity })
  @ApiParam({ name: 'id', description: 'Answer id', type: 'number' })
  getAnswerById(@Param('id') answerId: number): Promise<Answer> {
    return this.answerService.getAnswerById(answerId);
  }

  @Get('question/:id')
  @ApiOkResponse({ type: [AnswerEntity] })
  @ApiParam({ name: 'id', description: 'Question id', type: 'number' })
  getAllAnswersQuestionId(@Param('id') questionsId: number): Promise<Answer[]> {
    return this.answerService.getAllAnswersQuestionId(questionsId);
  }
}
