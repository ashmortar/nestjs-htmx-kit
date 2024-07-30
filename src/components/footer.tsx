import { Translations } from '@core/i18n/i18n.utils';
import { Link } from './link';
import { AppIcon } from './app-icon';

export function Footer({ t }: Translations) {
  return (
    <footer id="footer" class="header-footer">
      <div id="footer-content" class="flex-row-center ml-8">
        <div id="social-links" class="flex-row-center">
          <ul class="footer-link-list">
            <li class="mr-1">
              <Link
                class="white-link"
                hx-get="/"
                hx-target="#main"
                hx-swap="outerHTML"
              >
                <AppIcon height="16" width="16" class="mr-1" />
              </Link>
            </li>
            <li class="mr-1">
              <Link class="white-link" href="https://twitter.com">
                <div class="i-tabler-brand-x" title="X.com" />
              </Link>
            </li>
            <li class="mr-1">
              <Link class="white-link" href="https://facebook.com">
                <div class="i-tabler-brand-facebook" title="Facebook" />
              </Link>
            </li>
            <li>
              <Link class="white-link" href="https://instagram.com">
                <div class="i-tabler-brand-instagram" title="Instagram" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <nav id="footer-links" class="flex-row-center mr-8">
        <ul class="footer-link-list">
          <li class="mr-4">
            <Link
              class="white-link text-xs"
              hx-get="/about"
              hx-target="#main"
              hx-swap="outerHTML"
            >
              {t('root.links.about')}
            </Link>
          </li>
          <li class="mr-4">
            <Link
              class="white-link text-xs"
              hx-get="/contact"
              hx-target="#main"
              hx-swap="outerHTML"
            >
              {t('root.links.contact')}
            </Link>
          </li>
          <li class="mr-4">
            <Link
              class="white-link text-xs"
              hx-get="/terms"
              hx-target="#main"
              hx-swap="outerHTML"
            >
              {t('root.links.tou')}
            </Link>
          </li>
          <li>
            <Link
              class="white-link text-xs"
              hx-get="/privacy"
              hx-target="#main"
              hx-swap="outerHTML"
            >
              {t('root.links.privacy')}
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
