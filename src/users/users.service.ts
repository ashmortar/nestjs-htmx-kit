import { JwtPayload } from '@core/auth/jwt.strategy';
import { UserAndPiiInclude } from '@core/credentials/credentials.service';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'nestjs-prisma';

export type SessionWithUserPii = Prisma.SessionGetPayload<
  typeof UserAndPiiInclude
>;

@Injectable()
export class UsersService {
  #log = new Logger(UsersService.name);
  constructor(private readonly db: PrismaService) {}

  /**
   * Get a user by their JWT payload
   * @param {JwtPayload} jwt - The JWT payload
   * @returns {Promise<SessionWithUserPii>} The user session with associated User and PII
   */
  async getUserByJwt(jwt: JwtPayload) {
    const { sub: id } = jwt;
    const session = await this.db.session.findUnique({
      where: { id },
      ...UserAndPiiInclude,
    });
    return session;
  }
}
