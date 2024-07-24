import { Header, Footer } from '@core/components';
import { Translations } from '@core/i18n/i18n.utils';

export function MainLayout({ t }: Translations) {
  return (
    <>
      <Header t={t} />
      <main id="main">
        <div class="card">
          <h1>{t('main.welcome')}</h1>
          <p>{t('main.description')}</p>
        </div>
      </main>
      <Footer t={t} />
    </>
  );
}
