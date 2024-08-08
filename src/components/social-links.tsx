import type { Translations } from '@core/i18n/i18n.utils';
import { AppIcon } from './app-icon';
import { Link } from './link';

export type SocialLinksProps = Translations & { sidebar?: boolean };

export function SocialLinks({ t, sidebar }: SocialLinksProps) {
  if (sidebar) {
    return (
      <>
        <li>
          <Link class="white-link" href="https://twitter.com">
            <div
              class="i-tabler-brand-x"
              style="height: 24px; width: 24px;"
              title="X.com"
            />
            {t('root.links.twitter')}
          </Link>
        </li>
        <li>
          <Link class="white-link" href="https://facebook.com">
            <div
              class="i-tabler-brand-facebook"
              style="height: 24px; width: 24px;"
              title="Facebook"
            />
            {t('root.links.facebook')}
          </Link>
        </li>
        <li>
          <Link class="white-link" href="https://instagram.com">
            <div
              class="i-tabler-brand-instagram"
              style="height: 24px; width: 24px;"
              title="Instagram"
            />
            {t('root.links.instagram')}
          </Link>
        </li>
      </>
    );
  }
  return (
    <div
      id="footer-content"
      class="flex-row-center ml-8 min-h-8 hidden sm:flex"
    >
      <div id="social-links" class="flex-row-center hidden sm:block">
        <ul class="footer-link-list">
          <li class="mr-4">
            <Link
              class="white-link"
              hx-get="/"
              hx-target="#main"
              hx-swap="outerHTML"
            >
              <AppIcon height="24" width="24" />
            </Link>
          </li>
          <li class="mr-4">
            <Link class="white-link" href="https://twitter.com">
              <div
                class="i-tabler-brand-x"
                style="height: 24px; width: 24px;"
                title="X.com"
              />
            </Link>
          </li>
          <li class="mr-4">
            <Link class="white-link" href="https://facebook.com">
              <div
                class="i-tabler-brand-facebook"
                style="height: 24px; width: 24px;"
                title="Facebook"
              />
            </Link>
          </li>
          <li>
            <Link class="white-link" href="https://instagram.com">
              <div
                class="i-tabler-brand-instagram"
                style="height: 24px; width: 24px;"
                title="Instagram"
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
