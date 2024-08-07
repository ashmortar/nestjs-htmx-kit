import { ValidGoogleOauthData } from '@core/auth/google-oauth.strategy';
import { JwtPayload } from '@core/auth/jwt.strategy';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { pick } from 'lodash';
import { PrismaService } from 'nestjs-prisma';

export const PII_TYPES = [
  'first_name',
  'last_name',
  'display_name',
  'email',
  'phone',
  'address',
  'profile_photo_url',
] as const;
export type PiiType = (typeof PII_TYPES)[number];
export const PiiType: Record<PiiType, PiiType> = PII_TYPES.reduce(
  (acc, type) => ({ ...acc, [type]: type }),
  {} as Record<PiiType, PiiType>,
);

export const UserAndPiiInclude = {
  include: {
    user: { include: { pii: true } },
  },
} satisfies Prisma.SessionDefaultArgs;

export type SessionWithUserPii = Prisma.SessionGetPayload<
  typeof UserAndPiiInclude
>;

export type CredentialWithUserPii = Prisma.CredentialGetPayload<
  typeof UserAndPiiInclude
>;

@Injectable()
export class UsersService {
  #log = new Logger(UsersService.name);
  constructor(private readonly db: PrismaService) {}

  /**
   * Finds an existing user by external_id or email
   * @param {ValidGoogleOauthData} data - The data to search for
   * @returns {Promise<User | null>} The user if found, otherwise null
   */
  async findExistingUser(data: ValidGoogleOauthData): Promise<User | null> {
    const OR: Prisma.UserWhereInput['OR'] = [
      {
        credentials: {
          some: {
            external_id: data.credential.external_id,
            type: data.credential.type,
          },
        },
      },
    ];
    const email = data.pii.find((pii) => pii.type === 'email');
    if (email) {
      OR.push({ pii: { some: email } });
    }
    return this.db.user.findFirst({
      where: {
        OR,
      },
    });
  }

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

  /**
   * Create a new user with the given data
   * @param {ValidGoogleOauthData} data - The data to create the user with
   * @returns {Promise<CredentialWithUserPii>} The user session with associated User and PII
   */
  async createCredentialedUser(data: ValidGoogleOauthData) {
    const { credential, pii } = data;
    return this.db.credential.create({
      data: {
        ...credential,
        user: {
          create: {
            pii: {
              createMany: { data: pii },
            },
          },
        },
      },
      ...UserAndPiiInclude,
    });
  }

  /**
   * Update a user with the given data
   * @param {User} user - The user to update
   * @param {ValidGoogleOauthData} data - The data to update the user with
   * @returns {Promise<CredentialWithUserPii>} The user session with associated User and PII
   */
  async updateCredentialedUser(user: User, data: ValidGoogleOauthData) {
    const { credential, pii } = data;
    await this.db.$transaction(
      pii.map((pii) =>
        this.db.pii.upsert({
          where: {
            type_user_id: { type: pii.type, user_id: user.id },
          },
          create: {
            ...pii,
            user: {
              connect: { id: user.id },
            },
          },
          update: pii,
        }),
      ),
    );
    return this.db.credential.upsert({
      where: {
        type_external_id: pick(credential, ['type', 'external_id']),
      },
      create: {
        ...credential,
        user: {
          connect: { id: user.id },
        },
      },
      update: credential,
      ...UserAndPiiInclude,
    });
  }

  /**
   * Upsert a user with the given data
   * @param {ValidGoogleOauthData} data - The data to upsert the user with
   * @returns {Promise<CredentialWithUserPii>} The user session with associated User and PII
   */
  async upsertOauthCredentialUser(
    data: ValidGoogleOauthData,
  ): Promise<SessionWithUserPii> {
    const existing = await this.findExistingUser(data);

    if (existing) {
      return this.updateCredentialedUser(existing, data);
    }
    return this.createCredentialedUser(data);
  }
}
