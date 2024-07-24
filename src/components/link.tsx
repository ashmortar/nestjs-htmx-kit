import { ClassName } from './types';

type LinkProps =
  | ClassName
  | (
      | {
          'hx-get': string;
        }
      | {
          href: string;
        }
    );

export function Link({ children, ...rest }: Html.PropsWithChildren<LinkProps>) {
  const props =
    `href` in rest
      ? { ...rest, target: '_blank', rel: 'noopener noreferrer' }
      : rest;
  return <a {...props}>{children}</a>;
}
