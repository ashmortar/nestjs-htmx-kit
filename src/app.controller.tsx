import { I18nTranslations } from '@generated/i18n';
import { Controller, Get } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { ApiHtmlPartialResponse } from './htmx/htmx.utils';
import { mockT } from './i18n/i18n.utils';
import { MainLayout } from './layouts';

@Controller()
export class AppController {
  #t: I18nService['t'];
  constructor(private readonly i18n: I18nService<I18nTranslations>) {
    this.#t = this.i18n.t.bind(this.i18n);
  }

  @ApiHtmlPartialResponse({
    status: 200,
    description: 'Main HTML document landing page',
    jsx: <MainLayout t={mockT} />,
  })
  @Get()
  get() {
    return <MainLayout t={this.#t} />;
  }
}
