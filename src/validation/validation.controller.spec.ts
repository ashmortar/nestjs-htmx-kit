import { Test, TestingModule } from '@nestjs/testing';
import { ValidationController } from './validation.controller';

describe('ValidationController', () => {
  let module: TestingModule;
  let controller: ValidationController;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [ValidationController],
    }).compile();

    controller = module.get<ValidationController>(ValidationController);
  });
  afterEach(async () => {
    await module.close();
    return;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
