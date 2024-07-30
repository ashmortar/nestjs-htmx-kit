import { Translations } from '@core/i18n/i18n.utils';

import { AppIcon } from './app-icon';
import { Link } from './link';

export function Header({ t }: Translations) {
  return (
    <>
      <header id="header" class="header-footer">
        <nav id="home-nav" class="flex-row-center ml-8">
          <Link
            hx-get="/"
            hx-target="#main"
            hx-swap="outerHTML"
            class="flex-row-center link"
          >
            <AppIcon />
            <h1 class="font-montserrat text-xl m-0 p-0 ml-2">
              {t('root.app_name')}
            </h1>
          </Link>
        </nav>
        <div id="profile" hx-get="/auth/avatar" hx-trigger="load" />
      </header>
    </>
  );
}
