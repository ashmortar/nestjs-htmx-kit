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
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@generated/i18n';
@Injectable()
export class HtmxInterceptor implements NestInterceptor {
  #debugHtmx: boolean;
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {
    const { debugHtmx } = this.configService.getOrThrow('app');
    this.#debugHtmx = debugHtmx;
  }
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = _context.switchToHttp().getRequest();
    const isHtmx = isHtmxRequest(request);
    return next.handle().pipe(
      map((data) =>
        !isHtmx && isHtmlFragment(data)
          ? HtmlDoc({
              children: data,
              debugHtmx: this.#debugHtmx,
              t: this.i18n.t.bind(this.i18n),
              session: request.user,
            })
          : data,
      ),
    );
  }
}
