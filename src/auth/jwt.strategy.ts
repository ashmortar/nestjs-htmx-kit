import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from '@core/config/app';
import { Request } from 'express';
import {
  SessionService,
  SessionWithUserPii,
} from '@core/session/session.service';

export type JwtPayload = {
  sub: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly sessionService: SessionService,
    configService: ConfigService<Config>,
  ) {
    const extractJwtFromCookie = (req: Request) => {
      let token = null;
      if (req && req.signedCookies) {
        token = req.signedCookies['token'];
      }
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    super({
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('jwt').secret,
      jwtFromRequest: extractJwtFromCookie,
    });
  }

  async validate(payload: JwtPayload): Promise<SessionWithUserPii> {
    const session = await this.sessionService.getUserByJwt(payload);

    if (!session?.user)
      throw new UnauthorizedException('Please log in to continue');

    return session;
  }
}
