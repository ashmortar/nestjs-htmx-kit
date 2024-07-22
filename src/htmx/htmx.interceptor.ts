import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { HtmlDoc } from '@core/layouts';
import { isHtmlFragment } from './htmx.utils';

@Injectable()
export class HtmxInterceptor implements NestInterceptor {
  #l = new Logger(HtmxInterceptor.name);
  #debugHtmx: boolean;
  constructor(debug?: boolean) {
    this.#debugHtmx = !!debug;
  }
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) =>
        isHtmlFragment(data)
          ? HtmlDoc({
              children: data,
              debugHtmx: this.#debugHtmx,
            })
          : data,
      ),
    );
  }
}
