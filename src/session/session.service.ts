import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'nestjs-prisma';
import { UserAndPiiInclude } from '@core/credentials/credentials.service';
import { JwtPayload } from '@core/auth/jwt.strategy';

export type SessionWithUserPii = Prisma.SessionGetPayload<
  typeof UserAndPiiInclude
>;

@Injectable()
export class SessionService {
  constructor(private readonly db: PrismaService) {}

  /**
   * Get a user by their JWT payload
   * @param {JwtPayload} jwt - The JWT payload
   * @returns {Promise<SessionWithUserPii>} The user session with associated User and PII
   */
  async getUserByJwt(jwt: JwtPayload) {
    const { sub: id } = jwt;
    const session = await this.db.session.findUniqueOrThrow({
      where: { id },
      ...UserAndPiiInclude,
    });
    return session;
  }
}
