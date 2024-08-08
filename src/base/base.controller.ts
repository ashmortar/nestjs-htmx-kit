import { I18nTranslations } from '@generated/i18n';
import { I18nService } from 'nestjs-i18n';

export abstract class Base {
  languages: I18nService['getSupportedLanguages'];
  currentLanguage: I18nService['resolveLanguage'];
  t: I18nService['t'];
  constructor(private readonly i18n: I18nService<I18nTranslations>) {
    this.t = this.i18n.t.bind(this.i18n);
    this.languages = this.i18n.getSupportedLanguages.bind(this.i18n);
    this.currentLanguage = this.i18n.resolveLanguage.bind(this.i18n);
  }
}
