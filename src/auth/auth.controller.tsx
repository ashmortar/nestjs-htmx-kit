import { ApiHtmlPartialResponse } from '@core/htmx/htmx.utils';
import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from './google-oauth.guard';
import { Request, Response } from 'express';
import { ValidGoogleOauthData } from './google-oauth.strategy';
import { AuthService } from './auth.service';
import { Cookies } from '@core/cookies/cookies.decorator';
import { ConfigService } from '@nestjs/config';
import { Config } from '@core/config/app';
import { CurrentSession } from './current-session.decorator';
import { SessionWithUserPii } from '@core/users/users.service';
import { UserAvatar } from './components/user-avatar';
import { AuthLinks } from './components/auth-links';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly authService: AuthService,
  ) {}
  @ApiHtmlPartialResponse({
    status: 200,
    description: 'user avatar or login/signup links',
    jsx: (
      <div>
        <a href="signup">sign up</a>
      </div>
    ),
  })
  @Get('avatar')
  async avatar(@CurrentSession() sess: SessionWithUserPii | undefined) {
    if (sess) {
      return <UserAvatar user={sess.user} />;
    }
    return <AuthLinks />;
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async google(@Query('redirect') redirect: string, @Res() response: Response) {
    const { opts } = this.configService.getOrThrow('cookies');
    response.cookie('redirect', redirect, opts);
  }

  @Get('google/callback')
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
