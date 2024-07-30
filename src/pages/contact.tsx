import { Translations } from '@core/i18n/i18n.utils';

export function Contact({ t }: Translations) {
  return (
    <main class="main" id="main">
      <h1>{t('contact.title')}</h1>
      <p>{t('contact.description')}</p>
    </main>
  );
}
