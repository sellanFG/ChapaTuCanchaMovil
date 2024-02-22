import { Module } from '@nestjs/common';
import { MembersMatchService } from './members-match.service';
import { MembersMatchController } from './members-match.controller';

@Module({
  controllers: [MembersMatchController],
  providers: [MembersMatchService],
})
export class MembersMatchModule {}
