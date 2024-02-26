import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TemplateQuestionsModule } from 'src/template-questions/template-questions.module';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  imports: [PrismaModule, TemplateQuestionsModule],
})
export class AnswerModule {}
