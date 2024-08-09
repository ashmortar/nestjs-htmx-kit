import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { prismaMock } from '../../prisma/singleton';
import { CredentialsService } from '@core/credentials/credentials.service';
import { SessionService } from '@core/session/session.service';

describe('AuthService', () => {
  let module: TestingModule;
  let service: AuthService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [JwtModule],
      providers: [
        AuthService,
        SessionService,
        CredentialsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
