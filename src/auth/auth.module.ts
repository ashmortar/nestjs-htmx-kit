import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '@core/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { GoogleController } from './auth.google.controller';

@Module({
  imports: [JwtModule, UsersModule],
  controllers: [AuthController, GoogleController],
  providers: [AuthService],
})
export class AuthModule {}
