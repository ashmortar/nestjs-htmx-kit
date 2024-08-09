import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { prismaMock } from '../../prisma/singleton';
import { I18nModule } from 'nestjs-i18n';
import i18n_opts from '@core/config/i18n';
import opts from '@core/config/app';
import {
  CredentialsService,
  CredentialWithUserPii,
} from '@core/credentials/credentials.service';
import { SessionService } from '@core/session/session.service';
import { addDays } from 'date-fns';
import { mockRequest } from '../../test/utils';

describe('AuthController', () => {
  let module: TestingModule;
  let controller: AuthController;

  beforeAll(async () => {
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
        SessionService,
        CredentialsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });
  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('avatar', () => {
    it('should return an avatar if a session is provided', async () => {
      const result = await controller.avatar({
        id: '1',
        created_at: new Date(),
        updated_at: new Date(),
        user_id: '1',
        user: {
          id: '1',
          created_at: new Date(),
          updated_at: new Date(),
          status: 'verified',
          pii: [
            {
              id: '1',
              created_at: new Date(),
              updated_at: new Date(),
              user_id: '1',
              type: 'email',
              value: 'me@email.com',
            },
          ],
        },
      });

      expect(result).toMatch(/<a/);
      expect(result).toMatch(/hx-get="\/profile" hx-target="#main"/);
      expect(result).toMatch(/<div>me@email.com<\/div>/);
    });
    it('should return auth links if no session is provided', async () => {
      const result = await controller.avatar();
      expect(result).toMatch(/<nav id="auth-nav"/);
      expect(result).toMatch(/hx-get="\/auth\/sign-in" hx-target="#main"/);
      expect(result).toMatch(/hx-get="\/auth\/register" hx-target="#main"/);
    });
  });

  describe('signIn', () => {
    const email = 'test@example.com';
    const password = 'password';
    const credential: CredentialWithUserPii = {
      id: '1',
      created_at: new Date(),
      updated_at: new Date(),
      user_id: '1',
      external_id: email,
      expires_at: addDays(new Date(), 1),
      refresh_token: null,
      type: 'password',
      value: 'value',
      user: {
        id: '1',
        created_at: new Date(),
        updated_at: new Date(),
        status: 'verified',
        pii: [
          {
            id: '1',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: '1',
            type: 'email',
            value: email,
          },
        ],
      },
    };

    beforeEach(() => {
      prismaMock.credential.findUniqueOrThrow.mockResolvedValue(credential);
    });

    it('should return a sign in form', async () => {
      const result = await controller.signIn();
      expect(result).toMatch(/<main id="main"/);
      expect(result).toMatch(
        /<form id="sign-in-form" hx-post="\/auth\/sign-in" hx-trigger="submit" hx-swap="none"/,
      );
      expect(result).toMatch(/<input type="email"/);
      expect(result).toMatch(
        /hx-target="#email-input" required placeholder="Enter your email" title="Email"/,
      );
      expect(result).toMatch(/<input type="password"/);
      expect(result).toMatch(
        /hx-target="#password-input" required placeholder="Enter your password" title="Password"/,
      );
      expect(result).toMatch(/<button type="submit"/);
    });

    it('should return the credential if the user exists and password is correct', async () => {
      mockRequest.user = credential;
      const result = await controller.signInPost(
        { email, password },
        mockRequest,
      );
      expect(result).toEqual(credential);
    });
  });
});
