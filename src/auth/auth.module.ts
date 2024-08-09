import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { GoogleController } from './auth.google.controller';
import { CredentialsService } from '@core/credentials/credentials.service';
import { PrismaModule } from 'nestjs-prisma';
import { SessionService } from '@core/session/session.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [JwtModule, PrismaModule, PassportModule],
  controllers: [AuthController, GoogleController],
  providers: [AuthService, CredentialsService, SessionService, LocalStrategy],
})
export class AuthModule {}
