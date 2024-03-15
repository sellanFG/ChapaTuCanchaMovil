import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePreferenceDto, UpdatePreferenceDto } from './dto/index';
import { PreferencesEntity } from './entities/preferences.entity';
import {
  ArrayPreferences,
  PreferencesInterface,
} from './interfaces/preferences.interface';
import { Preference } from './dto/createPreferenceDto.dto';

@Injectable()
export class PreferencesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePreferenceDto): Promise<PreferencesInterface[]> {
    const { playerId, preferences } = data;
    await this.prisma.preferences.createMany({
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

    const query = await this.prisma.preferences.findMany({
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
    await this.prisma.preferences.update({
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
