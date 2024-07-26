import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SessionWithUserPii, UsersService } from '@core/users/users.service';
import { ValidGoogleOauthData } from './google-oauth.strategy';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  generateJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async oauthSignIn(data?: ValidGoogleOauthData): Promise<SessionWithUserPii> {
    if (!data) {
      throw new BadRequestException('Invalid user data');
    }

    return this.usersService.upsertOauthCredentialUser(data);
  }
}
