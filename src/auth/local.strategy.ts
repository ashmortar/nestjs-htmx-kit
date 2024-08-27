import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignInFormName,
  SignInResultSchema,
} from './validation/schemas/sign-in';
import { CredentialWithUserPii } from '@core/credentials/credentials.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    email: string,
    password: string,
  ): Promise<CredentialWithUserPii> {
    const credential = await this.authService.localSignIn({ email, password });
    return SignInResultSchema.parse({ [SignInFormName]: credential })[
      SignInFormName
    ];
  }
}
