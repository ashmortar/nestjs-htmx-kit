import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Config } from './config/app';
import helmet from 'helmet';
import colors from 'picocolors';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { HtmxInterceptor } from './htmx/htmx.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService<Config>);
  const { port, debug_routes } = config.getOrThrow('server');
  app.useGlobalInterceptors(new HtmxInterceptor(config));
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          scriptSrc: [
            "'self'",
            'https://cdn.jsdelivr.net/npm/htmx.org/dist/htmx.js',
          ],
        },
      },
    }),
  );
  app.use(cookieParser(config.getOrThrow('cookies').secret));
  app.useGlobalPipes(new ValidationPipe());
  const { title, description, version } = config.getOrThrow('app');
  const swaggerConfig = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build();
  patchNestjsSwagger();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {});
  SwaggerModule.setup('/api', app, document);
  const pathname = join(__dirname, '..', 'public');

  app.useStaticAssets(pathname);
  await app.listen(port);

  if (debug_routes) {
    debugRoutes(app);
  }

  appRunning(await app.getUrl());
}
bootstrap().catch(console.error);

function appRunning(url: string) {
  console.log(
    colors.magenta(`
Application is running on:
${colors.green(url)}
`),
  );
}

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
  console.log(
    colors.magenta(
      Object.entries(availableRoutes)
        .map(
          ([path, methods]) =>
            `${path}\n${methods.map((m) => ` - ${m}`).join('\n')}`,
        )
        .join('\n'),
    ),
  );
}
