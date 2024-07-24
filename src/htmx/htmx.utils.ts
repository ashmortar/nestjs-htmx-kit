import { ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

export function isHtmxRequest(request: Request): boolean {
  return request.headers['hx-request'] === 'true';
}

/** content contains some html tag */
export const HTML_REGEX = /<([a-z0-9]+)(?:[^>]*?)\s*\/>|<\1(?:[^>]*?)>/i;

export const FULL_HTML_REGEX = /^<!doctype html>/i;

export function isHtmlFragment(data: any): boolean {
  return (
    typeof data === 'string' &&
    HTML_REGEX.test(data) &&
    !FULL_HTML_REGEX.test(data)
  );
}

export function isHtmlDocument(data: any): boolean {
  return (
    typeof data === 'string' &&
    HTML_REGEX.test(data) &&
    FULL_HTML_REGEX.test(data)
  );
}

export const ApiHtmlPartialResponse = (props: {
  status: number;
  description: string;
  jsx: JSX.Element;
}) =>
  ApiResponse({
    status: props.status,
    description: props.description,
    content: {
      'text/html': {
        schema: {
          type: 'string',
          example: props.jsx,
        },
      },
    },
  });
