import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GameModeModule } from 'src/game-mode/game-mode.module';
import { SportFieldModule } from 'src/sport-field/sport-field.module';
import { SportModule } from 'src/sport/sport.module';

@Module({
  controllers: [MatchController],
  providers: [MatchService,],
  imports: [PrismaModule,GameModeModule,SportFieldModule,SportModule],
  exports: [MatchService]
})
export class MatchModule {}
