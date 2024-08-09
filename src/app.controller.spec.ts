import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import opts from './config/app';
import { I18nModule } from 'nestjs-i18n';
import i18n_opts from './config/i18n';

describe('AppController', () => {
  let module: TestingModule;
  let controller: AppController;
  const SHOULD_MATCH = [
    '<main id="main"',
    '<h1',
    '<p',
    '/p>',
    '/h1>',
    '/main>',
  ];
  const SHOULD_NOT_MATCH = ['<html', '<head', '<body', '<!DOCTYPE html'];

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ ...opts, envFilePath: '.env.test' }),
        I18nModule.forRoot(i18n_opts),
      ],
      controllers: [AppController],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('index', () => {
    it('should return the root main content', () => {
      const result = controller.index();
      // haves
      [...SHOULD_MATCH, 'Welcome to NestJsx', 'is a starter template'].forEach(
        (el) => {
          expect(result).toMatch(el);
        },
      );
      // have-nots
      SHOULD_NOT_MATCH.forEach((el) => {
        expect(result).not.toMatch(el);
      });
    });
  });

  describe('about', () => {
    it('should return the about main content', () => {
      const result = controller.about();
      // haves
      [
        ...SHOULD_MATCH,
        'About',
        'This is an example of a server rendered page',
      ].forEach((el) => {
        expect(result).toMatch(el);
      });
      // have-nots
      SHOULD_NOT_MATCH.forEach((el) => {
        expect(result).not.toMatch(el);
      });
    });
  });

  describe('contact', () => {
    it('should return the contact main content', () => {
      const result = controller.contact();
      // haves
      [
        ...SHOULD_MATCH,
        'Contact',
        'This is an example of a server rendered',
      ].forEach((el) => {
        expect(result).toMatch(el);
      });
      // have-nots
      SHOULD_NOT_MATCH.forEach((el) => {
        expect(result).not.toMatch(el);
      });
    });
  });

  describe('privacy', () => {
    it('should return the privacy main content', () => {
      const result = controller.privacy();
      // haves
      [
        ...SHOULD_MATCH,
        'Privacy',
        'This is an example of a server rendered',
      ].forEach((el) => {
        expect(result).toMatch(el);
      });
      // have-nots
      SHOULD_NOT_MATCH.forEach((el) => {
        expect(result).not.toMatch(el);
      });
    });
  });

  describe('terms', () => {
    it('should return the terms main content', () => {
      const result = controller.terms();
      // haves
      [
        ...SHOULD_MATCH,
        'Terms',
        'This is an example of a server rendered',
      ].forEach((el) => {
        expect(result).toMatch(el);
      });
      // have-nots
      SHOULD_NOT_MATCH.forEach((el) => {
        expect(result).not.toMatch(el);
      });
    });
  });
});
