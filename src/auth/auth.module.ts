import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '@core/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { GoogleController } from './auth.google.controller';
import { CredentialsService } from '@core/credentials/credentials.service';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [JwtModule, UsersModule, PrismaModule],
  controllers: [AuthController, GoogleController],
  providers: [AuthService, CredentialsService],
})
export class AuthModule {}
