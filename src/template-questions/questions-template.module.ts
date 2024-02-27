import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SportModule } from 'src/sport/sport.module';
import { QuestionsTemplateController } from './questions-template.controller';
import { QuestionsTemplateService } from './questions-template.service';

@Module({
  controllers: [QuestionsTemplateController],
  providers: [QuestionsTemplateService],
  imports: [PrismaModule, SportModule],
  exports: [QuestionsTemplateService],
})
export class QuestionsTemplateModule {}
