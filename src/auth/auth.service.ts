import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ValidGoogleOauthData } from './google-oauth.strategy';
import { JwtPayload } from './jwt.strategy';
import { SignInDto } from './validation/schemas/sign-in';
import { SessionService } from '@core/session/session.service';
import {
  CredentialsService,
  CredentialWithUserPii,
} from '@core/credentials/credentials.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly sessionService: SessionService,
    private readonly credentialsService: CredentialsService,
  ) {}

  generateJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async oauthSignIn(
    data?: ValidGoogleOauthData,
  ): Promise<CredentialWithUserPii | null> {
    if (!data) {
      return null;
    }

    return this.credentialsService.upsertOauthCredentialUser(data);
  }

  async localSignIn({
    email,
    password,
  }: SignInDto): Promise<CredentialWithUserPii | null> {
    const credential =
      await this.credentialsService.findLocalUserByEmail(email);
    const valid = await bcrypt.compare(password, credential?.value || '');
    if (!valid || !credential) {
      return null;
    }
    return credential;
  }

  async localRegister({
    email,
    password,
  }: SignInDto): Promise<CredentialWithUserPii | null> {
    const existing = await this.credentialsService.findLocalUserByEmail(email);
    if (existing) {
      return null;
    }

    return this.credentialsService.createLocalUser(email, password);
  }
}
