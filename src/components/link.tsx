import { ClassName } from './types';

type LinkProps = ClassName &
  (
    | {
        'hx-get': string;
      }
    | {
        href: string;
      }
  );

export function Link({
  class: className,
  children,
  ...rest
}: Html.PropsWithChildren<LinkProps>) {
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
