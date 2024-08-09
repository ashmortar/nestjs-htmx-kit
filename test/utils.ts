import { ArgumentsHost } from '@nestjs/common';
import { Request } from 'express';
import { mockDeep } from 'jest-mock-extended';

export const mockArgumentsHost = mockDeep<ArgumentsHost>({
  switchToHttp: jest.fn().mockReturnValue({
    getRequest: jest.fn().mockReturnValue({
      headers: {
        'hx-request': 'true',
      },
    }),
    getResponse: jest.fn().mockReturnValue({
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    }),
    getNext: jest.fn(),
  }),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
});

export const mockRequest = mockDeep<Request>();
