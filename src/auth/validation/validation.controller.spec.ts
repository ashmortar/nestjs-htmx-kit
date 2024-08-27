import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { I18nModule } from 'nestjs-i18n';
import { ValidationController } from './validation.controller';
import i18n_opts from '@core/config/i18n';

describe('AuthValidationController', () => {
  let module: TestingModule;
  let controller: ValidationController;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [I18nModule.forRoot(i18n_opts)],
      controllers: [ValidationController],
    }).compile();

    controller = module.get<ValidationController>(ValidationController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('email', () => {
    it('should return a success email component', async () => {
      const result = await controller.email({ email: 'email@email.com' });
      [
        '<div class="mb-6" id="email-input" hx-swap-oob="true">',
        'text-green-600',
        'value="email@email.com"',
        'valid email',
      ].forEach((el) => {
        expect(result).toContain(el);
      });
    });
  });

  describe('password', () => {
    it('should return a success password component', async () => {
      const result = await controller.password({ password: 'password' });
      [
        '<div class="mb-6" id="password-input" hx-swap-oob="true">',
        'text-green-600',
        'value="password"',
        'password is valid',
      ].forEach((el) => {
        expect(result).toContain(el);
      });
    });
  });

  describe('confirmPassword', () => {
    it('should return a success confirm password component', async () => {
      const result = await controller.confirmPassword({
        password: 'password',
        'confirm-password': 'password',
      });
      [
        '<div class="mb-6" id="confirm-password-input" hx-swap-oob="true">',
        'text-green-600',
        'value="password"',
        'passwords match',
      ].forEach((el) => {
        expect(result).toContain(el);
      });
    });
  });
});
