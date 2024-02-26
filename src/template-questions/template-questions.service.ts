import { Injectable, NotFoundException } from '@nestjs/common';
import { TeamplateQuestions } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SportService } from 'src/sport/sport.service';

@Injectable()
export class TemplateQuestionsService {
  constructor(
    private readonly prisma: PrismaService,
    private sportService: SportService,
  ) {}

  async getAllQuestionsSportId(sportId: number): Promise<TeamplateQuestions[]> {
    await this.sportService.getSportById(sportId);

    return this.prisma.handleDbOperation(
      this.prisma.teamplateQuestions.findMany({
        where: {
          SportId: sportId,
        },
      }),
    );
  }

  async getById(questionId: number): Promise<TeamplateQuestions> {
    const question = await this.prisma.handleDbOperation(
      this.prisma.teamplateQuestions.findUnique({
        where: {
          teamplateQuestionsId: questionId,
        },
      }),
    );
    if (!question) {
      throw new NotFoundException(`Question with id ${questionId} not found`);
    }
    return question;
  }
}
