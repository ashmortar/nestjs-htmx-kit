import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type Cookies = Record<string, string>;

export const Cookies = createParamDecorator(
  (key: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as {
      cookies: Cookies;
      signedCookies: Cookies;
    };
    if (key === undefined) {
      return request.signedCookies;
    }
    return request.signedCookies[key];
  },
);
