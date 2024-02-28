import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePreferenceDto } from './dto/createPreferenceDto.dto';

@Injectable()
export class PreferencesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePreferenceDto): Promise<NonNullable<unknown>> {
    const { playerId, sportId, answerId } = data;
    await this.prisma.handleDbOperation(
      this.prisma.preferences.create({
        data,
      }),
    );
    return this.getPreferences(playerId, sportId, answerId);
  }

  async getPreferences(
    playerId: number,
    sportId?: number,
    answerId?: number,
  ): Promise<NonNullable<unknown>> {
    const answers = await this.prisma.handleDbOperation(
      this.prisma.preferences.findMany({
        where: {
          playerId,
          sportId,
          answerId,
          SportPlayer: {
            status: true,
          },
        },
        include: {
          Answer: {
            include: {
              Question: true,
            },
          },
          SportPlayer: {
            include: {
              Sport: true,
            },
          },
        },
      }),
    );
    return this.buildPreferencesModel(answers);
  }

  private buildPreferencesModel(answers: any): NonNullable<unknown> {
    const preferences = {};
    answers.forEach((answer) => {
      const sportName = answer.SportPlayer.Sport.sportName;
      if (!preferences[sportName]) {
        preferences[sportName] = {
          sportId: answer.sportId,
          sportImage: answer.SportPlayer.Sport.sportImage,
          preferences: [],
        };
      }

      preferences[sportName]['preferences'].push({
        questionId: answer.Answer.questionsTemplateId,
        question: answer.Answer.Question.question,
        answerId: answer.answerId,
        answer: answer.Answer.answer,
      });
    });
    return preferences;
  }

  async delete(
    playerId: number,
    sportId: number,
    answerId: number,
  ): Promise<NonNullable<unknown>> {
    const deletePreference = await this.getPreferences(
      playerId,
      sportId,
      answerId,
    );
    await this.prisma.handleDbOperation(
      this.prisma.preferences.delete({
        where: {
          playerId_sportId_answerId: {
            playerId,
            sportId,
            answerId,
          },
        },
      }),
    );
    return deletePreference;
  }
}
