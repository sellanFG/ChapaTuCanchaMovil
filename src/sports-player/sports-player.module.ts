import { Module } from '@nestjs/common';
import { PlayerModule } from 'src/player/player.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SportModule } from 'src/sport/sport.module';
import { SportsPlayerController } from './sports-player.controller';
import { SportsPlayerService } from './sports-player.service';

@Module({
  controllers: [SportsPlayerController],
  providers: [SportsPlayerService],
  imports: [PrismaModule, SportModule, PlayerModule],
})
export class SportsPlayerModule {}
