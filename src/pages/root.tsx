import { Translations } from '@core/i18n/i18n.utils';

export function Index({ t }: Translations) {
  return (
    <main class="main" id="main">
      <h1>{t('root.welcome')}</h1>
      <p>{t('root.description')}</p>
    </main>
  );
}
