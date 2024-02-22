import { Test, TestingModule } from '@nestjs/testing';
import { SearchParametersController } from './search-parameters.controller';
import { SearchParametersService } from './search-parameters.service';

describe('SearchParametersController', () => {
  let controller: SearchParametersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchParametersController],
      providers: [SearchParametersService],
    }).compile();

    controller = module.get<SearchParametersController>(SearchParametersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
