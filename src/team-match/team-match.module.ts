import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TeamMatchController } from './team-match.controller';
import { TeamMatchService } from './team-match.service';

@Module({
  controllers: [TeamMatchController],
  providers: [TeamMatchService],
  imports: [PrismaModule],
  exports: [TeamMatchService],
})
export class TeamMatchModule {}
