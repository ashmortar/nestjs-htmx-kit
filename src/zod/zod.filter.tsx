import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ZodFilter<T extends ZodError> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response
      .status(HttpStatus.BAD_REQUEST)
      // send an array of error messages
      // id's are the path of the error
      // htmx can then oob-swap them into
      // place in the form
      .send(<Errors zodError={exception} />);
  }
}

function Errors({ zodError }: { zodError: ZodError }) {
  return (
    <>
      {zodError.errors.map((issue) => (
        <div id={issue.path?.toString?.()}>
          <p class="error">
            <small safe>{issue.message}</small>
          </p>
        </div>
      ))}
    </>
  );
}
