import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from '@core/config/app';
import { UsersService } from '@core/users/users.service';
import { Request } from 'express';

export type JwtPayload = {
  sub: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService<Config>,
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

  async validate(payload: JwtPayload) {
    const session = await this.usersService.getUserByJwt(payload);

    if (!session?.user)
      throw new UnauthorizedException('Please log in to continue');

    return session;
  }
}
