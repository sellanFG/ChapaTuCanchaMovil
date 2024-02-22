import { Module } from '@nestjs/common';
import { SportsPlayerService } from './sports-player.service';
import { SportsPlayerController } from './sports-player.controller';

@Module({
  controllers: [SportsPlayerController],
  providers: [SportsPlayerService],
})
export class SportsPlayerModule {}
