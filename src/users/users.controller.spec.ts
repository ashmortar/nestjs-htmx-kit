import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'nestjs-prisma';
import { prismaMock } from '../../prisma/singleton';

describe('UsersController', () => {
  let module: TestingModule;
  let controller: UsersController;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });
  afterEach(async () => {
    await module.close();
    return;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
