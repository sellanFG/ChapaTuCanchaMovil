import { Test, TestingModule } from '@nestjs/testing';
import { TemplateQuestionsController } from './template-questions.controller';
import { TemplateQuestionsService } from './template-questions.service';

describe('TemplateQuestionsController', () => {
  let controller: TemplateQuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateQuestionsController],
      providers: [TemplateQuestionsService],
    }).compile();

    controller = module.get<TemplateQuestionsController>(TemplateQuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
