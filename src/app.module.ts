import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';

import opts from './config/app';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { I18nModule } from 'nestjs-i18n';
import i18n_opts from './config/i18n';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot(opts),
    PrismaModule.forRoot(),
    I18nModule.forRoot(i18n_opts),
    AuthModule,
  ],
})
export class AppModule {}
