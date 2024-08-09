import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SessionWithUserPii, UsersService } from '@core/users/users.service';
import { ValidGoogleOauthData } from './google-oauth.strategy';
import { JwtPayload } from './jwt.strategy';
import bcrypt from 'bcrypt';
import {
  CredentialsService,
  CredentialWithUserPii,
} from '@core/credentials/credentials.service';
import { SignInDto } from './schemas/sign-in';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly credentialsService: CredentialsService,
  ) {}

  generateJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async oauthSignIn(data?: ValidGoogleOauthData): Promise<SessionWithUserPii> {
    if (!data) {
      throw new BadRequestException('Invalid user data');
    }

    return this.credentialsService.upsertOauthCredentialUser(data);
  }

  async localSignIn({
    email,
    password,
  }: SignInDto): Promise<CredentialWithUserPii> {
    const credential =
      await this.credentialsService.findLocalUserByEmail(email);
    const valid = await bcrypt.compare(password, credential?.value || '');
    if (!valid || !credential) {
      throw new BadRequestException('Invalid email or password');
    }
    return credential;
  }

  async localRegister({
    email,
    password,
  }: SignInDto): Promise<CredentialWithUserPii> {
    const existing = await this.credentialsService.findLocalUserByEmail(email);
    if (existing) {
      throw new BadRequestException('User already exists');
    }

    return this.credentialsService.createLocalUser(email, password);
  }
}
