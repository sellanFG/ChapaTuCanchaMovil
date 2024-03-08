import { Injectable, NotFoundException } from '@nestjs/common';
import { QuestionsTemplate } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionsTemplateService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<QuestionsTemplate[]> {
    return this.prisma.handleDbOperation(
      this.prisma.questionsTemplate.findMany({
        include: {
          Answer: {
            select: {
              answerId: true,
              answer: true,
            },
          },
        },
      }),
    );
  }

  async getById(questionId: number): Promise<QuestionsTemplate> {
    const question = await this.prisma.handleDbOperation(
      this.prisma.questionsTemplate.findUnique({
        where: {
          questionsTemplateId: questionId,
        },
      }),
    );
    if (!question) {
      throw new NotFoundException(`Question with id ${questionId} not found`);
    }
    return question;
  }
}
