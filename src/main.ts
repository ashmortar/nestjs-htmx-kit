import { join } from 'path';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import colors from 'picocolors';
import cookieParser from 'cookie-parser';
import type { SwaggerCustomOptions } from '@nestjs/swagger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { I18nService } from 'nestjs-i18n';
import { Logger } from 'nestjs-pino';
import { ZodFilter } from './zod/zod.filter';
import { ZodValidationPipe } from './zod/zod.pipe';
import { HtmxInterceptor } from './htmx/htmx.interceptor';
import { AppModule } from './app.module';
import type { Config } from './config/app';
import otelSDK from './tracing';
import type { I18nTranslations } from '@generated/i18n';

async function bootstrap() {
  await otelSDK.start();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.flushLogs();
  const config = app.get(ConfigService<Config>);
  const { port, debug_routes } = config.getOrThrow('server');
  const i18n = app.get(I18nService<I18nTranslations>);
  app.useGlobalInterceptors(new HtmxInterceptor(config, i18n));
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          scriptSrc: [
            "'self'",
            "'sha256-t6dWM2KssN4Zql6ihJ9VKYMUx9+nXRs0nMHCuv9qAZM='",
          ],
        },
      },
    }),
  );
  app.use(cookieParser(config.getOrThrow('cookies').secret));
  app.useGlobalPipes(new ZodValidationPipe());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ZodFilter(i18n));
  const { title, description, version } = config.getOrThrow('app');
  const swaggerConfig = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build();
  patchNestjsSwagger();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {});
  const opts: SwaggerCustomOptions = {
    swaggerOptions: {},
  };
  SwaggerModule.setup('/api', app, document, opts);
  const pathname = join(__dirname, '..', 'public');

  app.useStaticAssets(pathname);
  await app.listen(port);

  if (debug_routes) {
    debugRoutes(app);
  }
}
bootstrap().catch(console.error);

function debugRoutes(app: NestExpressApplication) {
  const server = app.getHttpServer();
  // @ts-expect-error this exists
  const router = server._events.request._router;
  const availableRoutes: { [key: string]: string[] } = router.stack
    // @ts-expect-error this exists
    .map((layer) => {
      if (layer.route) {
        return {
          route: {
            path: layer.route?.path,
            method: layer.route?.stack[0].method,
          },
        };
      }
    })
    // @ts-expect-error this exists
    .filter((item) => item !== undefined && !item.route.path.includes('api'))
    // @ts-expect-error this exists
    .reduce((acc, c) => {
      if (acc[c.route.path]) {
        acc[c.route.path].push(c.route.method);
      } else {
        acc[c.route.path] = [c.route.method];
      }
      return acc;
    }, {});
  setTimeout(async () => {
    console.table(
      Object.entries(availableRoutes).map(([route, methods]) => ({
        route,
        ...Object.fromEntries(methods.map((m) => [m, '✔'])),
      })),
    );
    console.log(
      `Application is running on: ${colors.green(await app.getUrl())}`,
    );
  }, 1000);
}
