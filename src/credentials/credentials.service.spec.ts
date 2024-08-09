import { Test, TestingModule } from '@nestjs/testing';
import {
  CredentialsService,
  CredentialWithUserPii,
  UserAndPiiInclude,
} from './credentials.service';
import { PrismaService } from 'nestjs-prisma';
import { ValidGoogleOauthData } from '@core/auth/google-oauth.strategy';
import { faker } from '@faker-js/faker';
import { User, Pii, Credential, Prisma } from '@prisma/client';
import { pick } from 'lodash';
import { prismaMock } from '../../prisma/singleton';

describe('CredentialsService', () => {
  let service: CredentialsService;
  let module: TestingModule;

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

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        CredentialsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<CredentialsService>(CredentialsService);
  });
  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
