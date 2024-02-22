import { Test, TestingModule } from '@nestjs/testing';
import { SportsPlayerService } from './sports-player.service';

describe('SportsPlayerService', () => {
  let service: SportsPlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SportsPlayerService],
    }).compile();

    service = module.get<SportsPlayerService>(SportsPlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
