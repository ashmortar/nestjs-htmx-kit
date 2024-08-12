import { I18nModule, I18nService } from 'nestjs-i18n';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { ZodError } from 'zod';
import { mockArgumentsHost } from '../../test/utils';
import { SchemaValidationError } from './zod.pipe';
import { Errors, ZodFilter } from './zod.filter';
import i18n_opts from '@core/config/i18n';
import type { I18nTranslations } from '@generated/i18n';

describe('ZodFilter', () => {
  let module: TestingModule;
  let filter: ZodFilter<SchemaValidationError>;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [I18nModule.forRoot(i18n_opts)],
      providers: [ZodFilter],
    }).compile();
    filter = module.get<ZodFilter<SchemaValidationError>>(
      ZodFilter<SchemaValidationError>,
    );
  });
  afterAll(async () => {
    await module.close();
  });
  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  it('should transform a schema validation error into an error component', () => {
    const error = new SchemaValidationError(
      new ZodError([
        {
          path: ['email'],
          message: 'invalid email',
          code: 'invalid_string',
          validation: 'email',
        },
      ]),
      'value',
    );
    const i18n = module.get<I18nService<I18nTranslations>>(I18nService);
    filter.catch(error, mockArgumentsHost);
    expect(
      mockArgumentsHost.switchToHttp().getResponse().status,
    ).toHaveBeenCalledWith(200);
    expect(
      mockArgumentsHost.switchToHttp().getResponse().send,
    ).toHaveBeenCalledWith(
      Errors({
        zodError: error,
        t: i18n.t.bind(i18n),
      }),
    );
  });
});
