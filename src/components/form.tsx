import { ClassName } from './types';

export type FormProps = ClassName &
  (
    | {
        'hx-get': string;
        'hx-trigger': string;
      }
    | {
        'hx-post': string;
        'hx-trigger': string;
      }
  );

export function Form({ children, ...rest }: Html.PropsWithChildren<FormProps>) {
  return <form {...rest}>{children}</form>;
}
