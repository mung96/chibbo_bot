// src/slack/slack.controller.ts
import { Body, Controller, Post, Res } from '@nestjs/common';
import { SlackService } from './slack.service';
import { NotionService, Routine } from '../notion/notion.service';
import { Response } from 'express';
import { SlackCommandDto } from 'src/slack/dto/slack-command.dto';

@Controller('slack')
export class SlackController {
  constructor(
    private readonly slackService: SlackService,
    private readonly notionService: NotionService,
  ) {}

  @Post()
  async checkExercise(@Res() res: Response) {
    // 1. Slack 메시지 전송
    await this.slackService.sendMessage('C08L1AJD4D6', '운동 체크 완료!');

    // 2. Notion에 체크 업데이트
    // await this.notionService.checkExercise(this.notionDbId, userName);

    return res.status(200).send('운동 체크 완료되었습니다!');
  }

  @Post('/routine')
  async checkTest(@Body() body: SlackCommandDto, @Res() res: Response) {
    const { user_name, command } = body;

    const commandToRoutineMap: Record<string, Routine> = {
      '/운동': Routine.EXERCISE,
      '/경신스': Routine.SCRAP_NEWS,
      '/독서': Routine.READ_BOOK,
      '/1일1지원': Routine.EVERY_DAY_APPLY,
      '/미라클모닝': Routine.MIRACLE_MORNING,
    };

    const routine = commandToRoutineMap[command];

    await this.notionService.checkRoutine(user_name, routine);

    return res.status(200).send('체크완료');
  }
}
