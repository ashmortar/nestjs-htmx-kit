import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

export type Cookies = Record<string, string>;

export const Cookies = createParamDecorator(
  (key: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (key === undefined) {
      return request.signedCookies;
    }
    return request.signedCookies[key];
  },
);
