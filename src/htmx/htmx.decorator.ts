import { applyDecorators, Get, Header, RequestMethod } from '@nestjs/common';

/**
 * Methods decorated with this route will
 * @param route string
 * @returns MethodDecorator
 */
export function Route(route = '', method = RequestMethod.GET): MethodDecorator {
  return applyDecorators(Get(route), Header('Hx-Push-Url', route));
}

function Method(
  method: RequestMethod,
): (path: string | string[]) => MethodDecorator {
  switch (method) {
    case RequestMethod.GET:
      return Get;

    default:
      throw new Error(`${method} not implemented`);
  }
}
