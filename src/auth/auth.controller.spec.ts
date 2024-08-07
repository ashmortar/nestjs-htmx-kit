import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '@core/users/users.service';
import { PrismaService } from 'nestjs-prisma';
import { prismaMock } from '../../prisma/singleton';
import { I18nModule } from 'nestjs-i18n';
import i18n_opts from '@core/config/i18n';
import opts from '@core/config/app';

describe('AuthController', () => {
  let module: TestingModule;
  let controller: AuthController;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          ...opts,
          envFilePath: ['.env.test'],
        }),
        I18nModule.forRoot(i18n_opts),
        JwtModule,
      ],
      providers: [
        AuthService,
        UsersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });
  afterEach(async () => {
    await module.close();
    return;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
