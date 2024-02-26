import { Module } from '@nestjs/common';
import { GameModeService } from './game-mode.service';
import { GameModeController } from './game-mode.controller';
import { SportModule } from 'src/sport/sport.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [GameModeController],
  providers: [GameModeService],
  exports: [GameModeService],
  imports: [SportModule,PrismaModule],
})
export class GameModeModule {}
