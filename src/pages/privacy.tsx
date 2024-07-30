import { Translations } from '@core/i18n/i18n.utils';

export function Privacy({ t }: Translations) {
  return (
    <main class="main" id="main">
      <h1>{t('privacy.title')}</h1>
      <p>{t('privacy.description')}</p>
    </main>
  );
}
