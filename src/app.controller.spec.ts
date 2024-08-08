import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import opts from './config/app';
import { isHtmlDocument, isHtmlFragment } from './htmx/htmx.utils';
import { I18nModule } from 'nestjs-i18n';
import i18n_opts from './config/i18n';

describe('AppController', () => {
  let module: TestingModule;
  let controller: AppController;

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

  it('should return an html fragment injected with app title', () => {
    const result = controller.index();
    expect(isHtmlFragment(result)).toBe(true);
    expect(isHtmlDocument(result)).toBe(false);
    expect(result).toMatch(/NestJsx/);
  });
});
