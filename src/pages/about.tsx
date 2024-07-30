import { Translations } from '@core/i18n/i18n.utils';

export function About({ t }: Translations) {
  return (
    <main class="main" id="main">
      <h1>{t('about.title')}</h1>
      <p>{t('about.description')}</p>
    </main>
  );
}
