import { Body, Controller } from '@nestjs/common';

import { AuthService } from './auth.service';

import { ConfigService } from '@nestjs/config';
import { Config } from '@core/config/app';
import { CurrentSession } from './current-session.decorator';
import { SessionWithUserPii } from '@core/users/users.service';
import { UserAvatar } from './components/user-avatar';
import { AuthLinks } from './components/auth-links';
import { Base } from '@core/base/base.controller';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@generated/i18n';
import { Form, Partial, Route } from '@core/htmx/htmx.decorator';
import * as P from '@core/auth/pages';

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
  @Partial({
    route: 'avatar',
    status: 200,
    description: 'user avatar or login/signup links',
    example: (
      <nav>
        <a href="signup">sign up</a>
      </nav>
    ),
  })
  async avatar(@CurrentSession() sess: SessionWithUserPii | undefined) {
    if (sess) {
      return <UserAvatar user={sess.user} t={this.t} />;
    }
    return <AuthLinks t={this.t} />;
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
  signIn() {
    return <P.SignIn t={this.t} />;
  }

  @Form({
    route: 'sign-in',
    status: 201,
    description: 'sign in',
  })
  async sigInPost(@Body() signInDto: SignInDto) {
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

  @Form({
    route: 'register',
    status: 201,
    description: 'register',
  })
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

  @Form({
    route: 'forgot-password',
    status: 201,
    description: 'forgot  password',
  })
  async forgotPasswordPost(@Body() emailDto: EmailDto) {
    console.log(emailDto);
  }
}
