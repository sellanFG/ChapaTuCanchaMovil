import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { SportModule } from 'src/sport/sport.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
  imports: [SportModule, PrismaModule],
})
export class TeamModule {}
