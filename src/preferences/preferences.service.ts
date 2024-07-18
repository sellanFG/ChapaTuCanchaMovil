import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Preference } from './dto/createPreferenceDto.dto';
import { CreatePreferenceDto, UpdatePreferenceDto } from './dto/index';
import { PreferencesEntity } from './entities/preferences.entity';
import {
  ArrayPreferences,
  PreferencesInterface,
} from './interfaces/preferences.interface';

@Injectable()
export class PreferencesService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreatePreferenceDto): Promise<PreferencesInterface[]> {
    const { playerId, preferences } = data;
    await this.prisma.preference.createMany({
      data: preferences.map(
        (p) => new PreferencesEntity(p.answerId, playerId, p.sportId),
      ),
    });
    return this.getPreferences(playerId, preferences);
  }

  async getPreferences(
    playerId: number,
    preferences?: Preference[],
  ): Promise<PreferencesInterface[]> {
    const answerIds = preferences?.map((p) => p.answerId);
    const sportIds = preferences?.map((p) => p.sportId);

    const query = await this.prisma.preference.findMany({
      where: {
        playerId,
        answerId: {
          in: answerIds,
        },
        sportId: {
          in: sportIds,
        },
      },
      include: {
        answer: {
          include: {
            question: {
              include: {
                sport: true,
              },
            },
          },
        },
      },
    });
    return this.buildPreferencesModel(query);
  }

  private buildPreferencesModel(query: any): PreferencesInterface[] {
    const model: Record<string, any> = {};
    const sportNames = [];
    query.forEach((value) => {
      const sportName = value.Answer.Question.Sport.sportName;
      if (!model[sportName]) {
        model[sportName] = <PreferencesInterface>{
          sportId: value.Answer.Question.sportId,
          sportName: value.Answer.Question.Sport.sportName,
          sportImage: value.Answer.Question.Sport.sportImage,
          preferences: [],
        };
        sportNames.push(sportName);
      }

      model[sportName]['preferences'].push(<ArrayPreferences>{
        questionId: value.Answer.questionsTemplateId,
        question: value.Answer.Question.question,
        answerId: value.answerId,
        answer: value.Answer.answer,
      });
    });

    return sportNames.map((sportName) => model[sportName]);
  }

  async update(answerId: number, data: UpdatePreferenceDto) {
    const { playerId, sportId } = data;
    await this.prisma.preference.update({
      where: {
        playerId_answerId_sportId: {
          answerId,
          playerId,
          sportId,
        },
      },
      data,
    });
  }
}
