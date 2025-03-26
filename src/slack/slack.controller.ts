// src/slack/slack.controller.ts
import { Controller, Get, Post, Res } from '@nestjs/common';
import { SlackService } from './slack.service';
import { Response } from 'express';

@Controller('slack')
export class SlackController {
  constructor(private readonly slackService: SlackService) {}

  @Post()
  async sendHello(@Res() res: Response) {
    await this.slackService.sendMessage('C08L1AJD4D6', '안녕하세요post');
    return res.status(200).send('메시지를 전송했습니다.');
  }

  @Get()
  async sendHelloGet(@Res() res: Response) {
    await this.slackService.sendMessage('C08L1AJD4D6', '안녕하세요get');
    return res.status(200).send('메시지를 전송했습니다.');
  }
}
