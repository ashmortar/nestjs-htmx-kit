import { Config } from '@core/config/app';
import { PiiType } from '@core/credentials/credentials.service';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { addDays } from 'date-fns';

import { Strategy, VerifyCallback } from 'passport-google-oauth2';

export type GoogleCredential = {
  type: 'google';
  external_id: string;
  value: string;
  refresh_token: string;
  expires_at: Date;
};

export type ValidGoogleOauthData = {
  pii: { type: PiiType; value: string }[];
  credential: GoogleCredential;
};
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService<Config>) {
    super(configService.getOrThrow('auth').google);
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;

    const data: ValidGoogleOauthData = {
      pii: [
        { type: 'first_name', value: name.givenName },
        { type: 'last_name', value: name.familyName },
        { type: 'display_name', value: name.displayName },
        { type: 'email', value: emails[0].value },
        { type: 'profile_photo_url', value: photos[0].value },
      ],
      credential: {
        type: 'google',
        external_id: id,
        value: _accessToken,
        refresh_token: _refreshToken,
        expires_at: addDays(new Date(), 1),
      },
    };

    done(null, data);
  }
}
