import { Controller } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Base } from '@core/base/base.controller';
import { Route } from '@core/htmx/htmx.decorator';
import { mockT } from '@core/i18n/i18n.utils';
import * as P from '@core/pages';
import { I18nTranslations } from '@generated/i18n';

@Controller()
export class AppController extends Base {
  constructor(i18n: I18nService<I18nTranslations>) {
    super(i18n);
  }

  @Route({
    description: 'Main HTML document landing page',
    example: <P.Index t={mockT} />,
  })
  index() {
    return <P.Index t={this.t} />;
  }

  @Route({
    route: '/about',
    description: 'About page',
    example: <P.About t={mockT} />,
  })
  about() {
    return <P.About t={this.t} />;
  }

  @Route({
    route: '/contact',
    description: 'Contact page',
    example: <P.Contact t={mockT} />,
  })
  contact() {
    return <P.Contact t={this.t} />;
  }

  @Route({
    route: '/privacy',
    description: 'Privacy page',
    example: <P.Privacy t={mockT} />,
  })
  privacy() {
    return <P.Privacy t={this.t} />;
  }

  @Route({
    route: '/terms',
    description: 'Terms page',
    example: <P.Tou t={mockT} />,
  })
  terms() {
    return <P.Tou t={this.t} />;
  }
}
