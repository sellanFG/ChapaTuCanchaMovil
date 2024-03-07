import { Module } from '@nestjs/common';
import { MembersMatchModule } from 'src/members-match/members-match.module';
import { PlayerModule } from 'src/player/player.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TeamMatchModule } from 'src/team-match/team-match.module';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';

@Module({
  controllers: [MatchController],
  providers: [MatchService],
  imports: [PrismaModule, MembersMatchModule, TeamMatchModule, PlayerModule],
  exports: [MatchService],
})
export class MatchModule {}
