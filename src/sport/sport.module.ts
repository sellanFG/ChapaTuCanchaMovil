import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SportController } from './sport.controller';
import { SportService } from './sport.service';

@Module({
  providers: [SportService],
  controllers: [SportController],
  exports: [SportService],
  imports: [PrismaModule],
})
export class SportModule {}
