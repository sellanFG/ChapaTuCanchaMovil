import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { answer } from '@prisma/client';
import { AnswerService } from './answer.service';
import { CreateAnswerDto, UpdateAnswerDto } from './dto/index';
import { Answer } from './entities/answer.entity';

@ApiTags('answer')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get()
  @ApiOkResponse({ type: [Answer] })
  getAll(): Promise<answer[]> {
    return this.answerService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: [Answer] })
  @ApiParam({ name: 'id', description: 'Question id', type: 'number' })
  getAllAnswersQuestionId(@Param('id') id: number): Promise<answer[]> {
    return this.answerService.getAllAnswersQuestionId(id);
  }
}
