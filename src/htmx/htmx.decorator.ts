import { applyDecorators, Get, Header } from '@nestjs/common';
import { ApiHtmlPartialResponse, HtmlPartialResponseProps } from './htmx.utils';

export type RouteProps = {
  route?: string;
  prefix?: string;
} & Omit<HtmlPartialResponseProps, 'status'>;
export function Route({
  route = '/',
  prefix = '',
  ...rest
}: RouteProps): MethodDecorator {
  return applyDecorators(
    ApiHtmlPartialResponse({
      ...rest,
      status: 200,
    }),
    Get(route),
    Header('Hx-Push-Url', prefix + route),
  );
}
