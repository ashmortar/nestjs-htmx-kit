import { Translations } from '@core/i18n/i18n.utils';

export function Tou({ t }: Translations) {
  return (
    <main class="main" id="main">
      <h1>{t('tou.title')}</h1>
      <p>{t('tou.description')}</p>
    </main>
  );
}
