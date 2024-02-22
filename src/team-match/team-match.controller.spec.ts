import { Test, TestingModule } from '@nestjs/testing';
import { TeamMatchController } from './team-match.controller';
import { TeamMatchService } from './team-match.service';

describe('TeamMatchController', () => {
  let controller: TeamMatchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamMatchController],
      providers: [TeamMatchService],
    }).compile();

    controller = module.get<TeamMatchController>(TeamMatchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
