import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SportModule } from 'src/sport/sport.module';
import { TemplateQuestionsController } from './template-questions.controller';
import { TemplateQuestionsService } from './template-questions.service';

@Module({
  controllers: [TemplateQuestionsController],
  providers: [TemplateQuestionsService],
  imports: [PrismaModule, SportModule],
})
export class TemplateQuestionsModule {}
