import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, answer } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnswerDto, UpdateAnswerDto } from './dto/index';
@Injectable()
export class AnswerService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAnswerDto): Promise<answer> {
    const questionId = data.questionId;

    const question = await this.prisma.teamplateQuestions.findUnique({
      where: {
        teamplateQuestionsId: questionId,
      },
    });

    if (!question) {
      throw new NotFoundException(`Question with id ${questionId} not found`);
    }

    return this.prisma.answer.create({
      data: {
        answer: data.answer,
        teamplateQuestionsId: questionId,
      },
    });
  }

  findAll(): Promise<answer[]> {
    return this.prisma.answer.findMany();
  }

  async findOne(data: Prisma.answerWhereUniqueInput): Promise<answer> {
    const answer = await this.prisma.answer.findUnique({
      where: data,
    });

    if (!answer) {
      throw new NotFoundException(`Answer with id ${data.answerId} not found`);
    }

    return answer;
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<answer> {
    const { questionId, answer } = updateAnswerDto;
    console.log(questionId, answer, id);
    await this.findOne({ answerId: id });

    return this.prisma.answer.update({
      where: { answerId: id },
      data: {
        answer,
        teamplateQuestionsId: questionId,
      },
    });
  }

  async remove(id: number): Promise<answer> {
    await this.findOne({ answerId: id });

    return this.prisma.answer.delete({
      where: { answerId: id },
    });
  }
}
