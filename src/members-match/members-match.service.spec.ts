import { Test, TestingModule } from '@nestjs/testing';
import { MembersMatchService } from './members-match.service';

describe('MembersMatchService', () => {
  let service: MembersMatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembersMatchService],
    }).compile();

    service = module.get<MembersMatchService>(MembersMatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
