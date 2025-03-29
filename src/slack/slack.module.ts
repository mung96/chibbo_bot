// src/slack/slack.module.ts
import { Module } from '@nestjs/common';
import { SlackService } from './slack.service';
import { SlackController } from './slack.controller';
import { NotionService } from 'src/notion/notion.service';

@Module({
  controllers: [SlackController],
  providers: [SlackService, NotionService],
})
export class SlackModule {}
