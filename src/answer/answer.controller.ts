import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { answer } from '@prisma/client';
import { AnswerService } from './answer.service';
import { CreateAnswerDto, UpdateAnswerDto } from './dto/index';
import { Answer } from './entities/answer.entity';

@ApiTags('answer')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @ApiCreatedResponse({ type: Answer })
  create(@Body() createAnswerDto: CreateAnswerDto): Promise<answer> {
    return this.answerService.create(createAnswerDto);
  }

  @Get()
  @ApiOkResponse({ type: [Answer] })
  findAll(): Promise<answer[]> {
    return this.answerService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Answer })
  findOne(@Param('id') id: number): Promise<answer> {
    return this.answerService.findOne({ answerId: id });
  }

  @Patch(':id')
  @ApiOkResponse({ type: Answer })
  update(@Param('id') id: number, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(id, updateAnswerDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Answer })
  remove(@Param('id') id: number) {
    return this.answerService.remove(id);
  }
}
