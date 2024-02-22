import { Test, TestingModule } from '@nestjs/testing';
import { MembersMatchController } from './members-match.controller';
import { MembersMatchService } from './members-match.service';

describe('MembersMatchController', () => {
  let controller: MembersMatchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembersMatchController],
      providers: [MembersMatchService],
    }).compile();

    controller = module.get<MembersMatchController>(MembersMatchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
