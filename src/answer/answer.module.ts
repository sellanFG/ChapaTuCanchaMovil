import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QuestionsTemplateModule } from 'src/template-questions/questions-template.module';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  imports: [PrismaModule, QuestionsTemplateModule],
})
export class AnswerModule {}
