import { Module } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [PreferencesController],
  providers: [PreferencesService],
  imports: [PrismaModule],
})
export class PreferencesModule {}
