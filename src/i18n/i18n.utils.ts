import { I18nTranslations } from '@generated/i18n';

import { I18nService, TranslateOptions } from 'nestjs-i18n';

export type Translations = {
  t: I18nService<I18nTranslations>['translate'];
};

export function mockT<
  P extends PathImpl2<I18nTranslations> = any,
  R = PathValue<I18nTranslations, P>,
>(key: P, options?: TranslateOptions): IfAnyOrNever<R, string, R> {
  let value = key as string;
  if (options) {
    value = value + `, ${JSON.stringify(options)}`;
  }
  return value as IfAnyOrNever<R, string, R>;
}

type IsAny<T> = unknown extends T
  ? [keyof T] extends [never]
    ? false
    : true
  : false;
type PathImpl<T, Key extends keyof T> = Key extends string
  ? IsAny<T[Key]> extends true
    ? never
    : T[Key] extends Record<string, any>
      ?
          | `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>> & string}`
          | `${Key}.${Exclude<keyof T[Key], keyof any[]> & string}`
      : never
  : never;
type PathImpl2<T> = PathImpl<T, keyof T> | keyof T;
type Path<T> = keyof T extends string
  ? PathImpl2<T> extends infer P
    ? P extends string | keyof T
      ? P
      : keyof T
    : keyof T
  : never;
type PathValue<T, P extends Path<T>> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends Path<T[Key]>
      ? PathValue<T[Key], Rest>
      : never
    : never
  : P extends keyof T
    ? T[P]
    : never;
type IfAnyOrNever<T, Y, N> = 0 extends 1 & T ? Y : [T] extends [never] ? Y : N;
