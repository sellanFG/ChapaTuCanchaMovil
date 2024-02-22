import { Module } from '@nestjs/common';
import { TemplateQuestionsService } from './template-questions.service';
import { TemplateQuestionsController } from './template-questions.controller';

@Module({
  controllers: [TemplateQuestionsController],
  providers: [TemplateQuestionsService],
})
export class TemplateQuestionsModule {}
