// Патчим глобальный fetch через undici (встроен в Node 18+, установка не нужна)
// Должно быть самой первой строкой — до всех других импортов
import { ProxyAgent, setGlobalDispatcher } from 'undici';
setGlobalDispatcher(new ProxyAgent('http://127.0.0.1:10809'));

import { bot } from './bot/index';
import { logger } from './utils/logger';

async function bootstrap() {
  try {
    logger.info({ context: 'App', message: 'Starting Telegram Bot...' });

    process.once('SIGINT', () => {
      logger.info({ context: 'App', message: 'Received SIGINT, stopping bot' });
      bot.stop('SIGINT');
    });

    process.once('SIGTERM', () => {
      logger.info({ context: 'App', message: 'Received SIGTERM, stopping bot' });
      bot.stop('SIGTERM');
    });

    await bot.launch();
    logger.info({ context: 'App', message: 'Bot successfully launched!' });

  } catch (error) {
    logger.error({ context: 'App', message: 'Failed to launch bot', stack: error instanceof Error ? error.stack : undefined });
    process.exit(1);
  }
}

bootstrap();
