import { Module } from '@nestjs/common';
import { SearchParametersService } from './search-parameters.service';
import { SearchParametersController } from './search-parameters.controller';

@Module({
  controllers: [SearchParametersController],
  providers: [SearchParametersService],
})
export class SearchParametersModule {}
