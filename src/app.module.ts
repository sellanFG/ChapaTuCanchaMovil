import { Module } from '@nestjs/common';
import { AnswerModule } from './answer/answer.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModeModule } from './game-mode/game-mode.module';
import { MatchModule } from './match/match.module';
import { MembersModule } from './members/members.module';
import { PlayerModule } from './player/player.module';
import { PreferencesModule } from './preferences/preferences.module';
import { SportFieldModule } from './sport-field/sport-field.module';
import { SportModule } from './sport/sport.module';
import { TeamMatchModule } from './team-match/team-match.module';
import { TeamModule } from './team/team.module';
import { QuestionsTemplateModule } from './template-questions/questions-template.module';
import { MembersMatchModule } from './members-match/members-match.module';
import { PrismaModule } from './prisma/prisma.module';
import { SportsPlayerModule } from './sports-player/sports-player.module';
import { SearchParametersModule } from './search-parameters/search-parameters.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SportModule,
    MatchModule,
    TeamModule,
    AnswerModule,
    PreferencesModule,
    MembersModule,
    TeamMatchModule,
    QuestionsTemplateModule,
    GameModeModule,
    SportFieldModule,
    PlayerModule,
    MembersMatchModule,
    PrismaModule,
    SportsPlayerModule,
    SearchParametersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
