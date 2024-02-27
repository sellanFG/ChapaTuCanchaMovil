import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsTemplateService } from './questions-template.service';

describe('TemplateQuestionsService', () => {
  let service: QuestionsTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionsTemplateService],
    }).compile();

    service = module.get<QuestionsTemplateService>(QuestionsTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
