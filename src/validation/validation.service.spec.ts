import { Test, TestingModule } from '@nestjs/testing';
import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  let module: TestingModule;
  let service: ValidationService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [ValidationService],
    }).compile();

    service = module.get<ValidationService>(ValidationService);
  });
  afterEach(async () => {
    await module.close();
    return;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
