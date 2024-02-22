import { Test, TestingModule } from '@nestjs/testing';
import { TeamMatchService } from './team-match.service';

describe('TeamMatchService', () => {
  let service: TeamMatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamMatchService],
    }).compile();

    service = module.get<TeamMatchService>(TeamMatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
