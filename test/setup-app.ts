import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { AppModule } from '@core/app.module';
import { Config } from '@core/config/app';

import { HtmxInterceptor } from '@core/htmx/htmx.interceptor';
import { ZodFilter } from '@core/zod/zod.filter';
import { I18nTranslations } from '@generated/i18n';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';

import { I18nService } from 'nestjs-i18n';
import { Logger } from 'nestjs-pino';

export async function setupApp() {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.flushLogs();
  const config = app.get(ConfigService<Config>);
  const i18n = app.get(I18nService<I18nTranslations>);
  app.useGlobalInterceptors(new HtmxInterceptor(config, i18n));
  app.useGlobalPipes(new ZodValidationPipe());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ZodFilter(i18n));
  await app.init();

  return app;
}
