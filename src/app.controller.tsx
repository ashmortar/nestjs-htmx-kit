import { I18nTranslations } from '@generated/i18n';
import { Controller } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { ApiHtmlPartialResponse } from './htmx/htmx.utils';
import { mockT } from './i18n/i18n.utils';
import { MainLayout } from './layouts';
import { Base } from './base/base.controller';
import { Route } from './htmx/htmx.decorator';

@Controller()
export class AppController extends Base {
  constructor(i18n: I18nService<I18nTranslations>) {
    super(i18n);
  }

  @ApiHtmlPartialResponse({
    status: 200,
    description: 'Main HTML document landing page',
    jsx: <MainLayout t={mockT} />,
  })
  @Route()
  get() {
    return <MainLayout t={this.t} />;
  }

  @Route('about')
  about() {
    return <main id="main">about</main>;
  }
}
