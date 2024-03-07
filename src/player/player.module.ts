import { Module } from '@nestjs/common';
import { MembersMatchModule } from 'src/members-match/members-match.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  controllers: [PlayerController],
  providers: [PlayerService],
  imports: [PrismaModule, MembersMatchModule],
  exports: [PlayerService],
})
export class PlayerModule {}
