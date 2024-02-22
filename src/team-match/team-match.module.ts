import { Module } from '@nestjs/common';
import { TeamMatchService } from './team-match.service';
import { TeamMatchController } from './team-match.controller';

@Module({
  controllers: [TeamMatchController],
  providers: [TeamMatchService],
})
export class TeamMatchModule {}
