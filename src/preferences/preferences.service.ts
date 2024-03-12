import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePreferenceDto } from './dto/createPreferenceDto.dto';
import { PreferencesEntity } from './entities/preferences.entity';
import {
  ArrayPreferences,
  PreferencesInterface,
} from './interfaces/preferences.interface';

@Injectable()
export class PreferencesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePreferenceDto): Promise<PreferencesInterface[]> {
    const { playerId, answerIds } = data;
    const preferences = answerIds.map(
      (answerId) => new PreferencesEntity(answerId, playerId),
    );
    await this.prisma.handleDbOperation(
      this.prisma.preferences.createMany({
        data: preferences,
      }),
    );
    return this.getPreferences(playerId, answerIds);
  }

  async getPreferences(
    playerId: number,
    answerIds?: number[],
  ): Promise<PreferencesInterface[]> {
    const preferences = await this.prisma.preferences.findMany({
      where: {
        playerId,
        Answer: {
          answerId: {
            in: answerIds,
          },
        },
      },
      include: {
        Answer: {
          include: {
            Question: {
              include: {
                Sport: true,
              },
            },
          },
        },
      },
    });
    return this.buildPreferencesModel(preferences);
  }

  private buildPreferencesModel(preferences: any): PreferencesInterface[] {
    const model: Record<string, any> = {};
    const sportNames = [];
    preferences.forEach((preference) => {
      const sportName = preference.Answer.Question.Sport.sportName;
      if (!model[sportName]) {
        model[sportName] = <PreferencesInterface>{
          sportId: preference.Answer.Question.sportId,
          sportName: preference.Answer.Question.Sport.sportName,
          sportImage: preference.Answer.Question.Sport.sportImage,
          preferences: [],
        };
        sportNames.push(sportName);
      }

      model[sportName]['preferences'].push(<ArrayPreferences>{
        questionId: preference.Answer.questionsTemplateId,
        question: preference.Answer.Question.question,
        answerId: preference.answerId,
        answer: preference.Answer.answer,
      });
    });

    return sportNames.map((sportName) => model[sportName]);
  }

  async delete(playerId: number, answerId: number): Promise<void> {
    await this.prisma.handleDbOperation(
      this.prisma.preferences.delete({
        where: {
          playerId_answerId: {
            playerId,
            answerId,
          },
        },
      }),
    );
  }
}
