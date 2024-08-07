import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '@core/users/users.service';
import { PrismaService } from 'nestjs-prisma';
import { prismaMock } from '../../prisma/singleton';

describe('AuthService', () => {
  let module: TestingModule;
  let service: AuthService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [JwtModule],
      providers: [
        AuthService,
        UsersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });
  afterEach(async () => {
    await module.close();
    return;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
