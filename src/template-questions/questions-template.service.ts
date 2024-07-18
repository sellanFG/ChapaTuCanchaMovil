import { Injectable, NotFoundException } from '@nestjs/common';
import { QuestionTemplate } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionsTemplateService {
  constructor(private readonly prisma: PrismaService) { }

  async getAll(): Promise<QuestionTemplate[]> {
    return this.prisma.handleDbOperation(
      this.prisma.questionTemplate.findMany({
        include: {
          answers: {
            select: {
              answerId: true,
              answer: true,
            },
          },
        },
      }),
    );
  }

  async getById(questionId: number): Promise<QuestionTemplate> {
    const question = await this.prisma.handleDbOperation(
      this.prisma.questionTemplate.findUnique({
        where: {
          questionTemplateId: questionId,
        },
      }),
    );
    if (!question) {
      throw new NotFoundException(`Question with id ${questionId} not found`);
    }
    return question;
  }
}
