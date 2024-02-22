import { Test, TestingModule } from '@nestjs/testing';
import { SportsPlayerController } from './sports-player.controller';
import { SportsPlayerService } from './sports-player.service';

describe('SportsPlayerController', () => {
  let controller: SportsPlayerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SportsPlayerController],
      providers: [SportsPlayerService],
    }).compile();

    controller = module.get<SportsPlayerController>(SportsPlayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
