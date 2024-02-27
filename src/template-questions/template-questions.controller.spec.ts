import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsTemplateController } from './questions-template.controller';
import { QuestionsTemplateService } from './questions-template.service';

describe('TemplateQuestionsController', () => {
  let controller: QuestionsTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsTemplateController],
      providers: [QuestionsTemplateService],
    }).compile();

    controller = module.get<QuestionsTemplateController>(
      QuestionsTemplateController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
