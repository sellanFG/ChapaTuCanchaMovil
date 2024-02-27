import { Injectable, NotFoundException } from '@nestjs/common';
import { QuestionsTemplate } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SportService } from 'src/sport/sport.service';

@Injectable()
export class QuestionsTemplateService {
  constructor(
    private readonly prisma: PrismaService,
    private sportService: SportService,
  ) {}

  async getAllQuestionsSportId(sportId: number): Promise<QuestionsTemplate[]> {
    await this.sportService.getSportById(sportId);

    return this.prisma.handleDbOperation(
      this.prisma.questionsTemplate.findMany({
        where: {
          SportId: sportId,
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
