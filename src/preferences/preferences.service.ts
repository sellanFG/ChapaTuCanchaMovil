import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePreferenceDto } from './dto/createPreferenceDto.dto';
import { preferences } from '@prisma/client';

@Injectable()
export class PreferencesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePreferenceDto): Promise<preferences> {
    return this.prisma.handleDbOperation(
      this.prisma.preferences.create({
        data,
      }),
    );
  }

  async getPreferences(playerId: number): Promise<NonNullable<unknown>> {
    const answers = await this.prisma.handleDbOperation(
      this.prisma.preferences.findMany({
        where: {
          playerId,
          sportPlayer: {
            status: true,
          },
        },
        include: {
          answer: {
            include: {
              question: true,
            },
          },
          sportPlayer: {
            include: {
              sport: true,
            },
          },
        },
      }),
    );

    const preferences = {};
    answers.forEach((answer) => {
      const sportName = answer.sportPlayer.sport.SportName;
      if (!preferences[sportName]) {
        preferences[sportName] = {
          sportId: answer.SportId,
          sportImage: answer.sportPlayer.sport.SportImage,
          preferences: [],
        };
      }

      preferences[sportName]['preferences'].push({
        questionId: answer.answer.questionsTemplateId,
        question: answer.answer.question.Question,
        answerId: answer.answerId,
        answer: answer.answer.answer,
      });
    });
    return preferences;
  }
}
