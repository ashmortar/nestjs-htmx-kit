import { I18nModule } from 'nestjs-i18n';
import { ZodFilter } from './zod.filter';
import { Test, TestingModule } from '@nestjs/testing';
import i18n_opts from '@core/config/i18n';
import { SchemaValidationError } from './zod.pipe';

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
});
