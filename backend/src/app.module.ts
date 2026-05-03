import { Module } from '@nestjs/common';
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './log/logger.module';
import { TaskModule } from './task/task.module';
import { SettingsModule } from './settings/settings.module';
import { ExpencesModule } from './expences/expences.module';
import { TipsModule } from './tips/tips.module';
import { AlertsModule } from './allerts/allert.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UserModule, TaskModule, SettingsModule, ExpencesModule, TipsModule, AlertsModule, AuthModule,
    ConfigModule.forRoot({ isGlobal: true }), LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
