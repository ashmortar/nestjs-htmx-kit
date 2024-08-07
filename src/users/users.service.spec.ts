import { Test, TestingModule } from '@nestjs/testing';
import {
  CredentialWithUserPii,
  SessionWithUserPii,
  UserAndPiiInclude,
  UsersService,
} from './users.service';
import { PrismaService } from 'nestjs-prisma';
import { prismaMock } from '../../prisma/singleton';
import { faker } from '@faker-js/faker';
import { Pii, User, Credential, Prisma } from '@prisma/client';
import { ValidGoogleOauthData } from '@core/auth/google-oauth.strategy';
import { pick } from 'lodash';

describe('UsersService', () => {
  let module: TestingModule;
  let service: UsersService;

  const data: ValidGoogleOauthData = {
    credential: {
      type: 'google',
      value: 'google_id',
      external_id: 'google_id',
      refresh_token: 'refresh_token',
      expires_at: faker.date.future(),
    },
    pii: [{ type: 'email', value: faker.internet.exampleEmail() }],
  };
  const user: User = {
    id: faker.string.uuid(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
    status: 'verified',
  };
  const pii: Pii[] = [
    {
      id: faker.string.uuid(),
      type: 'email',
      value: data.pii[0].value,
      user_id: user.id,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    },
  ];
  const credential: Credential = {
    id: faker.string.uuid(),
    type: data.credential.type,
    value: data.credential.value,
    external_id: data.credential.external_id,
    refresh_token: data.credential.refresh_token,
    expires_at: data.credential.expires_at,
    user_id: user.id,
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  };
  const credentialWithUserPii: CredentialWithUserPii = {
    ...credential,
    user: {
      ...user,
      pii,
    },
  } as const;

  const session: SessionWithUserPii = {
    id: faker.string.uuid(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
    user_id: user.id,
    user: {
      ...user,
      pii,
    },
  } as const;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });
  afterEach(async () => {
    await module.close();
    return;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findExistingUser', () => {
    it('should find a user by external_id', async () => {
      prismaMock.user.findFirst.mockResolvedValue(user);

      const result = await service.findExistingUser(data);

      expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
        where: {
          OR: [
            {
              credentials: {
                some: {
                  external_id: data.credential.external_id,
                  type: data.credential.type,
                },
              },
            },
            {
              pii: {
                some: {
                  value: data.pii[0].value,
                  type: data.pii[0].type,
                },
              },
            },
          ],
        },
      });

      expect(result).toEqual(user);

      const result2 = await service.findExistingUser({
        ...data,
        pii: [],
      });

      expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
        where: {
          OR: [
            {
              credentials: {
                some: {
                  external_id: data.credential.external_id,
                  type: data.credential.type,
                },
              },
            },
          ],
        },
      });

      expect(result2).toEqual(user);
    });
    it('should return null if no user is found', async () => {
      prismaMock.user.findFirst.mockResolvedValue(null);

      const result = await service.findExistingUser(data);

      expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
        where: {
          OR: [
            {
              credentials: {
                some: {
                  external_id: data.credential.external_id,
                  type: data.credential.type,
                },
              },
            },
            {
              pii: {
                some: {
                  value: data.pii[0].value,
                  type: data.pii[0].type,
                },
              },
            },
          ],
        },
      });

      expect(result).toBeNull();
    });
  });

  describe('getUserByJwt', () => {
    it('should get a user by jwt', async () => {
      const payload = { sub: session.id };

      prismaMock.session.findUnique.mockResolvedValue(session);

      const result = await service.getUserByJwt(payload);

      expect(prismaMock.session.findUnique).toHaveBeenCalledWith({
        where: { id: payload.sub },
        ...UserAndPiiInclude,
      });

      expect(result).toEqual(session);
    });

    it('should return null if no session is found', async () => {
      const payload = { sub: faker.string.uuid() };

      prismaMock.session.findUnique.mockResolvedValue(null);

      const result = await service.getUserByJwt(payload);

      expect(prismaMock.session.findUnique).toHaveBeenCalledWith({
        where: { id: payload.sub },
        ...UserAndPiiInclude,
      });

      expect(result).toBeNull();
    });
  });

  describe('createCredentialedUser', () => {
    it('should create a new user', async () => {
      prismaMock.credential.create.mockResolvedValue(credentialWithUserPii);

      const args = {
        data: {
          ...pick(credential, [
            'type',
            'value',
            'external_id',
            'refresh_token',
            'expires_at',
          ]),
          user: {
            create: {
              pii: {
                createMany: {
                  data: pii.map((p) => pick(p, ['type', 'value'])),
                },
              },
            },
          },
        },
        ...UserAndPiiInclude,
      } satisfies Prisma.CredentialCreateArgs;

      const result = await service.createCredentialedUser(data);

      expect(prismaMock.credential.create).toHaveBeenCalledWith(args);

      expect(result).toEqual(credentialWithUserPii);
    });
  });

  describe('updateCredentialedUser', () => {
    it('should update a user', async () => {
      const newPii: Pii = {
        id: faker.string.uuid(),
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
        type: 'phone',
        value: faker.phone.number(),
        user_id: user.id,
      };
      const newCredentialWithPii: CredentialWithUserPii = {
        ...credentialWithUserPii,
        user: {
          ...credentialWithUserPii.user,
          pii: [...pii, newPii],
        },
      };
      prismaMock.credential.upsert.mockResolvedValue(newCredentialWithPii);
      const gPii = pick(newPii, [
        'type',
        'value',
      ]) as ValidGoogleOauthData['pii'][number];
      const result = await service.updateCredentialedUser(user, {
        ...data,
        pii: [...data.pii, gPii],
      });

      expect(prismaMock.pii.upsert).toHaveBeenNthCalledWith(1, {
        where: {
          type_user_id: { type: 'email', user_id: user.id },
        },
        create: {
          ...data.pii[0],
          user: {
            connect: { id: user.id },
          },
        },
        update: data.pii[0],
      });
      expect(prismaMock.pii.upsert).toHaveBeenNthCalledWith(2, {
        where: {
          type_user_id: { type: 'phone', user_id: user.id },
        },
        create: {
          ...gPii,
          user: {
            connect: { id: user.id },
          },
        },
        update: gPii,
      });

      expect(prismaMock.credential.upsert).toHaveBeenCalledWith({
        where: {
          type_external_id: pick(data.credential, ['type', 'external_id']),
        },
        create: {
          ...data.credential,
          user: {
            connect: { id: user.id },
          },
        },
        update: data.credential,
        ...UserAndPiiInclude,
      });

      expect(result).toEqual(newCredentialWithPii);
    });
  });
});
