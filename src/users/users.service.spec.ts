import { Test, TestingModule } from '@nestjs/testing';
import { SessionWithUserPii, UsersService } from './users.service';
import { PrismaService } from 'nestjs-prisma';
import { prismaMock } from '../../prisma/singleton';
import { faker } from '@faker-js/faker';
import { Pii, User } from '@prisma/client';
import { ValidGoogleOauthData } from '@core/auth/google-oauth.strategy';
import { UserAndPiiInclude } from '@core/credentials/credentials.service';

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

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
});
