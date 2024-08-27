import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'nestjs-prisma';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleController } from './auth.google.controller';
import { LocalStrategy } from './local.strategy';
import { ValidationController } from './validation/validation.controller';
import { CredentialsService } from '@core/credentials/credentials.service';
import { SessionService } from '@core/session/session.service';

@Module({
  imports: [JwtModule, PrismaModule, PassportModule],
  controllers: [AuthController, GoogleController, ValidationController],
  providers: [AuthService, CredentialsService, SessionService, LocalStrategy],
})
export class AuthModule {}
