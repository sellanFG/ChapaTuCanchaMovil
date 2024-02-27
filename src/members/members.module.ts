import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PlayerModule } from 'src/player/player.module';
import { TeamModule } from 'src/team/team.module';

@Module({
  controllers: [MembersController],
  providers: [MembersService],
  imports: [PrismaModule,PlayerModule,TeamModule],
  exports: [MembersService],
})
export class MembersModule {}
