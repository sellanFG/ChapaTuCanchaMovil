import { Test, TestingModule } from '@nestjs/testing';
import { SearchParametersService } from './search-parameters.service';

describe('SearchParametersService', () => {
  let service: SearchParametersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchParametersService],
    }).compile();

    service = module.get<SearchParametersService>(SearchParametersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
