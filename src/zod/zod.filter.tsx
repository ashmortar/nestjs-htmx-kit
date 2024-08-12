import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nService } from 'nestjs-i18n';
import { SchemaValidationError } from './zod.pipe';
import { I18nTranslations } from '@generated/i18n';
import { Translations } from '@core/i18n/i18n.utils';
import {
  ConfirmPasswordInput,
  EmailInput,
  PasswordInput,
  type TypedInputProps,
} from '@core/components';

const ComponentNameMap: Record<
  string,
  (props: TypedInputProps) => JSX.Element
> = {
  email: EmailInput,
  password: PasswordInput,
  'confirm-password': ConfirmPasswordInput,
} as const;

@Catch(SchemaValidationError)
export class ZodFilter<T extends SchemaValidationError>
  implements ExceptionFilter
{
  constructor(private readonly i18nService: I18nService<I18nTranslations>) {}
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response
      .status(HttpStatus.OK)
      // send an array of error messages
      // id's are the path of the error
      // htmx can then oob-swap them into
      // place in the form
      .send(
        <Errors
          zodError={exception}
          t={this.i18nService.t.bind(this.i18nService)}
        />,
      );
  }
}

export function Errors({
  zodError,
  t,
}: { zodError: SchemaValidationError } & Translations) {
  return (
    <>
      {zodError.errors.map((issue) => {
        const name = issue.path.join('-');
        const Component = ComponentNameMap[name];
        return (
          <Component error={issue} t={t} oob value={zodError.value[name]} />
        );
      })}
    </>
  );
}
