import { Injectable, NotFoundException } from '@nestjs/common';
import { answer } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { TemplateQuestionsService } from 'src/template-questions/template-questions.service';
@Injectable()
export class AnswerService {
  constructor(
    private prisma: PrismaService,
    private questionService: TemplateQuestionsService,
  ) {}

  getAll(): Promise<answer[]> {
    return this.prisma.handleDbOperation(this.prisma.answer.findMany());
  }

  async getAllAnswersQuestionId(questionId: number): Promise<answer[]> {
    await this.questionService.getById(questionId);

    return this.prisma.handleDbOperation(
      this.prisma.answer.findMany({
        where: {
          teamplateQuestionsId: questionId,
        },
      }),
    );
  }
}
