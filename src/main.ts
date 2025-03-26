import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { WebClient } from '@slack/web-api';

// const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.SLACK_BOT_TOKEN);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
