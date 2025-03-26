// src/app.module.ts
import { Module } from '@nestjs/common';
import { SlackModule } from './slack/slack.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SlackModule,
    ConfigModule.forRoot({
      isGlobal: true, // 전역에서 process.env 접근 가능
    }),
  ],
})
export class AppModule {}
