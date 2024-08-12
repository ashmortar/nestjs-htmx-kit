import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { I18nService } from 'nestjs-i18n';
import { Logger } from 'nestjs-pino';
import { AppModule } from '@core/app.module';
import type { Config } from '@core/config/app';
import opts from '@core/config/app';

import { HtmxInterceptor } from '@core/htmx/htmx.interceptor';
import { ZodFilter } from '@core/zod/zod.filter';
import type { I18nTranslations } from '@generated/i18n';

export async function setupApp() {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideModule(ConfigModule)
    .useModule(ConfigModule.forRoot({ ...opts, envFilePath: '.env.test' }))
    .compile();

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
