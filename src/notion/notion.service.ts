// src/notion/notion.service.ts
import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';

export enum Routine {
  // 미라클모닝,1일1지원,운동,경신스,독서
  EXERCISE = '운동',
  SCRAP_NEWS = '경신스',
  READ_BOOK = '독서',
  EVERY_DAY_APPLY = '1일1지원',
  MIRACLE_MORNING = '미라클모닝',
}

@Injectable()
export class NotionService {
  private notion = new Client({ auth: process.env.NOTION_SECRET });
  private readonly notionDbId = process.env.NOTION_DB_ID;

  //이름,날짜,루틴을 받는다.
  async checkRoutine(username: string, routine: Routine) {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // 'YYYY-MM-DD'

    const pages = await this.notion.databases.query({
      database_id: this.notionDbId!,
      filter: {
        and: [
          {
            property: '이름',
            rich_text: { equals: username },
          },
          {
            property: '날짜',
            date: {
              equals: formattedDate,
            },
          },
        ],
      },
    });

    //1-1없다면 새로운 행을 만들어, 이름 날짜
    let pageId: string;

    if (pages.results.length === 0) {
      // 페이지 없으면 새로 생성
      const createResult = await this.notion.pages.create({
        parent: { database_id: this.notionDbId! },
        properties: {
          이름: {
            title: [
              {
                text: {
                  content: username,
                },
              },
            ],
          },
          날짜: {
            date: {
              start: formattedDate,
            },
          },
        },
      });

      pageId = createResult.id;
    } else {
      // 이미 있는 경우
      pageId = pages.results[0].id;
    }

    //2. routine에 해당하는 체크박스 표시
    const properties: Record<string, any> = {
      [routine]: {
        checkbox: true,
      },
    };

    await this.notion.pages.update({
      page_id: pageId,
      properties,
    });
  }
}
