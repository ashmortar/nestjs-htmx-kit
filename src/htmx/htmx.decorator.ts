import { applyDecorators, Get, Header, Post } from '@nestjs/common';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';

export type HtmlPartialResponseProps = {
  status: number;
  description: string;
  example?: JSX.Element;
};

export const ApiHtmlPartialResponse = (props: HtmlPartialResponseProps) =>
  applyDecorators(
    ApiResponse({
      status: props.status,
      description: props.description,
      content: {
        'text/html': {
          schema: {
            type: 'string',
            example: props.example,
          },
        },
      },
    }),
    ApiHeader({
      name: 'HX-Request',
      required: true,
      allowEmptyValue: false,
      schema: {
        default: 'true',
      },
    }),
  );

type SlashString = `/${string}`;

export type RouteProps = {
  route?: SlashString;
  prefix?: SlashString;
  status?: number;
} & Omit<HtmlPartialResponseProps, 'status'>;
export function Route({
  route = '/',
  prefix,
  status = 200,
  ...rest
}: RouteProps): MethodDecorator {
  return applyDecorators(
    ApiHtmlPartialResponse({
      ...rest,
      status,
    }),
    Get(route),
    Header('Hx-Push-Url', () => `${prefix ?? ``}${route}`),
  );
}

export function Form({
  route = '/',
  status = 200,
  ...rest
}: RouteProps): MethodDecorator {
  return applyDecorators(
    ApiHtmlPartialResponse({
      ...rest,
      status,
    }),
    Post(route),
  );
}

export function Partial({
  route = '/',
  status = 200,
  ...rest
}: Omit<RouteProps, 'prefix'>): MethodDecorator {
  return applyDecorators(
    ApiHtmlPartialResponse({
      ...rest,
      status,
    }),
    Get(route),
  );
}
