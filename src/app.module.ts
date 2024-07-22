import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';

import opts from './config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  imports: [ConfigModule.forRoot(opts), PrismaModule.forRoot(), AuthModule],
})
export class AppModule {}
