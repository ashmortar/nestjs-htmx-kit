import { Cookies } from '@core/cookies/cookies.decorator';
import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from './google-oauth.guard';
import { ValidGoogleOauthData } from './google-oauth.strategy';
import { AuthService } from './auth.service';

@Controller('auth/google')
export class GoogleController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}
  @Get()
  @UseGuards(GoogleOauthGuard)
  async google(@Query('redirect') redirect: string, @Res() response: Response) {
    const { opts } = this.configService.getOrThrow('cookies');
    response.cookie('redirect', redirect, opts);
  }

  @Get('callback')
  @UseGuards(GoogleOauthGuard)
  async googleCallback(
    @Req() request: Request,
    @Res() response: Response,
    @Cookies('redirect') redirect: string | undefined,
  ) {
    const { opts } = this.configService.getOrThrow('cookies');
    const validUserData = request.user as ValidGoogleOauthData;
    const loggedInUser = await this.authService.oauthSignIn(validUserData);
    response.cookie('token', loggedInUser, opts);
    const path = redirect || '/';
    response.clearCookie('redirect');
    response.status(302).redirect(path);
  }
}
