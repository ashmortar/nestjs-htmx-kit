import { ApiHtmlPartialResponse } from '@core/htmx/htmx.utils';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
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
import { Base } from '@core/base/base.controller';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@generated/i18n';
import { Route } from '@core/htmx/htmx.decorator';
import * as P from '@core/auth/pages';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';
import { SignInDto } from './schemas/sign-in';
import { EmailDto } from '@core/validation/schemas';
const PREFIX = 'auth' as const;
const prefix = `/${PREFIX}/` as const;

@Controller(PREFIX)
export class AuthController extends Base {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly authService: AuthService,
    i18n: I18nService<I18nTranslations>,
  ) {
    super(i18n);
  }
  @ApiHtmlPartialResponse({
    status: 200,
    description: 'user avatar or login/signup links',
    example: (
      <nav>
        <a href="signup">sign up</a>
      </nav>
    ),
  })
  @Get('avatar')
  async avatar(@CurrentSession() sess: SessionWithUserPii | undefined) {
    if (sess) {
      return <UserAvatar user={sess.user} t={this.t} />;
    }
    return <AuthLinks t={this.t} />;
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

  @Route({
    route: 'sign-in',
    prefix,
    description: 'sign in form or user avatar',
    example: (
      <main>
        <form>...</form>
      </main>
    ),
  })
  signInPage() {
    return <P.SignIn t={this.t} />;
  }

  @ApiResponse({
    status: 201,
    description: 'sign in',
  })
  @ApiHeader({
    name: 'HX-Request',
    required: true,
    allowEmptyValue: false,
    schema: {
      default: 'true',
    },
  })
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    console.log(signInDto);
  }

  @Route({
    route: 'register',
    prefix,
    description: 'register form',
    example: (
      <main>
        <form>...</form>
      </main>
    ),
  })
  register() {
    return <P.Register t={this.t} />;
  }

  @ApiResponse({
    status: 201,
    description: 'register',
  })
  @ApiHeader({
    name: 'HX-Request',
    required: true,
    allowEmptyValue: false,
    schema: {
      default: 'true',
    },
  })
  @Post('register')
  async registerPost(@Body() signInDto: SignInDto) {
    console.log(signInDto);
  }

  @Route({
    route: 'forgot-password',
    prefix,
    description: 'forgot password form',
    example: (
      <main>
        <form>...</form>
      </main>
    ),
  })
  forgotPassword() {
    return <P.ForgotPassword t={this.t} />;
  }

  @ApiResponse({
    status: 201,
    description: 'forgot password',
  })
  @ApiHeader({
    name: 'HX-Request',
    required: true,
    allowEmptyValue: false,
    schema: {
      default: 'true',
    },
  })
  @Post('forgot-password')
  async forgotPasswordPost(@Body() emailDto: EmailDto) {
    console.log(emailDto);
  }
}
