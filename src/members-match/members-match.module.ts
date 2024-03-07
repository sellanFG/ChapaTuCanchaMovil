import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MembersMatchController } from './members-match.controller';
import { MembersMatchService } from './members-match.service';

@Module({
  controllers: [MembersMatchController],
  providers: [MembersMatchService],
  imports: [PrismaModule],
  exports: [MembersMatchService],
})
export class MembersMatchModule {}
