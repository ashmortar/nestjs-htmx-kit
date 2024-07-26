import { I18nTranslations } from '@generated/i18n';
import { I18nService } from 'nestjs-i18n';

export abstract class Base {
  t: I18nService['t'];
  constructor(private readonly i18n: I18nService<I18nTranslations>) {
    this.t = this.i18n.t.bind(this.i18n);
  }
}
