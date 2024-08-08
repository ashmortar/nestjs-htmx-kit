import { Test, TestingModule } from '@nestjs/testing';
import { ValidationController } from './validation.controller';

describe('ValidationController', () => {
  let module: TestingModule;
  let controller: ValidationController;

  beforeAll(async () => {
    module = await Test.createTestingModule({
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
