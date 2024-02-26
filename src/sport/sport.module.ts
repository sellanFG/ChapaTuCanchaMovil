import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SportService } from './sport.service';

@Module({
  providers: [SportService],
  exports: [SportService],
  imports: [PrismaModule],
})
export class SportModule {}
