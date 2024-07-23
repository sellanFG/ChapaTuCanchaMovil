import { PlayerModule } from '@/player/player.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  imports: [PlayerModule, JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '60s' },
  })],
  controllers: [AuthController],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  }, AuthService],
})
export class AuthModule { }
