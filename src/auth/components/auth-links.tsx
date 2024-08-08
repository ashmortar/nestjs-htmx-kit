import { Link } from '@core/components';
import { Translations } from '@core/i18n/i18n.utils';

export function AuthLinks({ t }: Translations) {
  return (
    <nav id="auth-nav" class="flex-row-between mr-8">
      <ul class="flex flex-1 flex-row list-none p-0">
        <li class="mr-4">
          <Link
            class="white-link"
            hx-get="/auth/sign-in"
            hx-target="#main"
            hx-swap="outerHTML"
          >
            {t('root.links.sign_in')}
          </Link>
        </li>
        <li>
          <Link
            class="white-link"
            hx-get="/auth/register"
            hx-target="#main"
            hx-swap="outerHTML"
          >
            {t('root.links.register')}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
