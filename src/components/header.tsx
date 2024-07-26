import { Translations } from '@core/i18n/i18n.utils';

import { AppIcon } from './app-icon';

export function Header({ t }: Translations) {
  return (
    <>
      <header id="header">
        <nav id="home-nav">
          <a href="/" hx-boost>
            <AppIcon />
            <h1>{t('main.app_name')}</h1>
          </a>
        </nav>
        <div id="profile" hx-get="/auth/avatar" hx-trigger="load" />
      </header>
    </>
  );
}
