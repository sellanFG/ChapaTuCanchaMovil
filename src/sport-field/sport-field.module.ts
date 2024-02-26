import { Module } from '@nestjs/common';
import { SportFieldService } from './sport-field.service';
import { SportFieldController } from './sport-field.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SportFieldController],
  providers: [SportFieldService,PrismaService],
  exports: [SportFieldService]
})
export class SportFieldModule {}
