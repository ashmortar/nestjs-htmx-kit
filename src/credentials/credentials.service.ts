import { ValidGoogleOauthData } from '@core/auth/google-oauth.strategy';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';
import { addDays } from 'date-fns';
import { pick } from 'lodash';

export const VerifiablePiiTypes = ['email', 'phone'] as const;
export type VerifiablePiiType = (typeof VerifiablePiiTypes)[number];

export const PII_TYPES = [
  ...VerifiablePiiTypes,
  'first_name',
  'last_name',
  'display_name',
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
} satisfies Prisma.CredentialDefaultArgs;

export type CredentialWithUserPii = Prisma.CredentialGetPayload<
  typeof UserAndPiiInclude
>;

const SALT_ROUNDS = 10;

const PASSWORD_ROTATION_DAYS = 90;

@Injectable()
export class CredentialsService {
  constructor(private readonly db: PrismaService) {}
  /**
   * Finds an existing user by external_id or email
   * @param {ValidGoogleOauthData} data - The data to search for
   * @returns {Promise<User | null>} The user if found, otherwise null
   */
  private async findExistingUser(
    data: ValidGoogleOauthData,
  ): Promise<User | null> {
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
  ): Promise<CredentialWithUserPii> {
    const existing = await this.findExistingUser(data);

    if (existing) {
      return this.updateCredentialedUser(existing, data);
    }
    return this.createCredentialedUser(data);
  }

  /**
   *
   * @param email
   * @returns
   */
  async findLocalUserByEmail(
    email: string,
  ): Promise<CredentialWithUserPii | null> {
    return this.db.credential.findUnique({
      where: {
        user: { pii: { some: { type: 'email', value: email } } },
        type_external_id: { type: 'password', external_id: email },
      },
      ...UserAndPiiInclude,
    });
  }

  private async createCredential(data: Prisma.CredentialCreateInput) {
    return this.db.credential.create({ data, ...UserAndPiiInclude });
  }

  /**
   * Create a new user with the given email and password
   * @param email
   * @param password
   * @returns
   */
  async createLocalUser(email: string, password: string) {
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    return this.createCredential({
      type: 'password',
      value: hashed,
      external_id: email,
      expires_at: addDays(new Date(), PASSWORD_ROTATION_DAYS),
      user: {
        create: {
          pii: {
            create: {
              type: 'email',
              value: email,
            },
          },
        },
      },
    });
  }
}
