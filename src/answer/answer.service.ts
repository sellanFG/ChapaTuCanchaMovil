import { Injectable, NotFoundException } from '@nestjs/common';
import { answer } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionsTemplateService } from 'src/template-questions/questions-template.service';
@Injectable()
export class AnswerService {
  constructor(
    private prisma: PrismaService,
    private questionService: QuestionsTemplateService,
  ) {}

  getAll(): Promise<answer[]> {
    return this.prisma.handleDbOperation(this.prisma.answer.findMany());
  }

  async getAllAnswersQuestionId(questionId: number): Promise<answer[]> {
    await this.questionService.getById(questionId);

    return this.prisma.handleDbOperation(
      this.prisma.answer.findMany({
        where: {
          questionsTemplateId: questionId,
        },
      }),
    );
  }

  async getAnswerById(id: number): Promise<answer> {
    const answer = await this.prisma.handleDbOperation(
      this.prisma.answer.findUnique({
        where: {
          answerId: id,
        },
      }),
    );

    if (!answer) {
      throw new NotFoundException(`Answer with id ${id} not found`);
    }
    return answer;
  }
}
