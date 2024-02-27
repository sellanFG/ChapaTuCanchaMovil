import { Module } from '@nestjs/common';
import { SearchParametersService } from './search-parameters.service';
import { SearchParametersController } from './search-parameters.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [SearchParametersController],
  providers: [SearchParametersService],
  imports: [PrismaModule],
})
export class SearchParametersModule {}
