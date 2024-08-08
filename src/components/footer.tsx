import { Translations } from '@core/i18n/i18n.utils';

import { Link } from './link';
import { AppIcon } from './app-icon';

export function Footer({ t }: Translations) {
  const year = new Date().getFullYear();
  return (
    <footer class="bg-white dark:bg-gray-800 px-4 lg:px-4 py-2.5 justify-self-end">
      <div class="w-full max-w-screen-xl mx-auto">
        <div class="sm:flex sm:items-center sm:justify-between">
          <Link
            href="https://github.com/ashmortar/nestjs-core#readme"
            class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <AppIcon style="fill: white;" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              {t('root.app_name')}
            </span>
          </Link>
          <ul class="flex flex-wrap items-center mb-4 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link
                hx-get="/about"
                hx-target="#main"
                hx-swap="outerHTML"
                class="hover:underline me-4 md:me-6"
              >
                {t('root.links.about')}
              </Link>
            </li>
            <li>
              <Link
                hx-get="/privacy"
                hx-target="#main"
                hx-swap="outerHTML"
                class="hover:underline me-4 md:me-6"
              >
                {t('root.links.privacy')}
              </Link>
            </li>
            <li>
              <Link
                hx-get="/terms"
                hx-target="#main"
                hx-swap="outerHTML"
                class="hover:underline me-4 md:me-6"
              >
                {t('root.links.tou')}
              </Link>
            </li>
            <li>
              <Link
                hx-get="/contact"
                hx-target="#main"
                hx-swap="outerHTML"
                class="hover:underline"
              >
                {t('root.links.contact')}
              </Link>
            </li>
          </ul>
        </div>
        <hr class="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-6" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {year}{' '}
          <Link
            href={t('root.company_url')}
            class="hover:underline text-blue-500"
          >
            {t('root.company_name')}
          </Link>
          . {t('root.rights')}
        </span>
      </div>
    </footer>
  );
}
