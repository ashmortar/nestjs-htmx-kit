import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';

import opts from './config/app';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { I18nModule } from 'nestjs-i18n';
import { UsersModule } from './users/users.module';
import { ValidationModule } from './validation/validation.module';
import i18n_opts from './config/i18n';
import { LoggerModule } from 'nestjs-pino';
import pinoOpts from './config/pino';
import { OpenTelemetryModule } from 'nestjs-otel';

@Module({
  controllers: [AppController],
  imports: [
    OpenTelemetryModule.forRoot({
      metrics: {
        hostMetrics: true,
        apiMetrics: {
          enable: true,
          defaultAttributes: {
            custom: 'NestJsx',
          },
          ignoreRoutes: ['/favicon.ico'],
          ignoreUndefinedRoutes: false,
        },
      },
    }),
    LoggerModule.forRoot(pinoOpts),
    ConfigModule.forRoot(opts),
    PrismaModule.forRoot(),
    I18nModule.forRoot(i18n_opts),
    AuthModule,
    UsersModule,
    ValidationModule,
  ],
})
export class AppModule {}
