import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { HtmlDoc } from '@core/layouts';
import { isHtmlFragment, isHtmxRequest } from './htmx.utils';
import { ConfigService } from '@nestjs/config';
import { Config } from '@core/config/app';

@Injectable()
export class HtmxInterceptor implements NestInterceptor {
  #title: string;
  #debugHtmx: boolean;
  constructor(private readonly configService: ConfigService<Config>) {
    const { debugHtmx, title } = this.configService.getOrThrow('app');
    this.#debugHtmx = debugHtmx;
    this.#title = title;
  }
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = _context.switchToHttp().getRequest();
    const isHtmx = isHtmxRequest(request);

    return next.handle().pipe(
      map((data) =>
        !isHtmx && isHtmlFragment(data)
          ? HtmlDoc({
              title: this.#title,
              children: data,
              debugHtmx: this.#debugHtmx,
            })
          : data,
      ),
    );
  }
}
