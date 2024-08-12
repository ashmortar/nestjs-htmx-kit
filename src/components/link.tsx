import type { PropsWithChildren } from '@kitajs/html';
import { ClassName } from './types';

export type LinkProps = ClassName &
  (
    | {
        'hx-get': string;
        'hx-target'?: string;
        'hx-swap'?: string;
      }
    | {
        href: string;
      }
  );

export function Link({
  class: className,
  children,
  ...rest
}: PropsWithChildren<LinkProps>) {
  const props =
    `href` in rest
      ? { ...rest, target: '_blank', rel: 'noopener noreferrer' }
      : rest;
  const ourClass = className ? className : 'link';

  return (
    <a class={ourClass} {...props}>
      {children}
    </a>
  );
}
