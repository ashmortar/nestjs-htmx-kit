import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { prismaMock } from '../../prisma/singleton';
import { SessionService } from './session.service';
import { UserAndPiiInclude } from '@core/credentials/credentials.service';

describe('SessionService', () => {
  let module: TestingModule;
  let service: SessionService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        SessionService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<SessionService>(SessionService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserByJwt', () => {
    it('should find unique or throw', async () => {
      const jwt = { sub: 'id' };
      await service.getUserByJwt(jwt);
      expect(prismaMock.session.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: 'id' },
        ...UserAndPiiInclude,
      });
    });
  });
});
