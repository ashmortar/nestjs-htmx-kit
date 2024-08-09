import { Test, TestingModule } from '@nestjs/testing';
import { ValidationController } from './validation.controller';
import { I18nModule } from 'nestjs-i18n';
import i18n_opts from '@core/config/i18n';

describe('ValidationController', () => {
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
});
