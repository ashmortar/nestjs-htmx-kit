import { Input, Link } from '@core/components';
import { Translations } from '@core/i18n/i18n.utils';

export function SignIn({ t }: Translations) {
  return (
    <main class="main" id="main">
      <h1>{t('auth.sign_in.title')}</h1>
      <div class="card">
        <div>
          <form id="sign-in-form" hx-post="/auth/sign-in" hx-trigger="submit">
            <Input
              type="email"
              name="email"
              title={t('auth.sign_in.email') ?? ``}
              label={t('auth.sign_in.email') ?? ``}
            />
            <Input
              type="password"
              name="password"
              label={t('auth.sign_in.password') ?? ``}
            />
            <button type="submit">{t('auth.sign_in.submit')}</button>
          </form>
          <Link
            hx-get="/auth/forgot-password"
            hx-target="#main"
            hx-swap="outerHTML"
            class="link"
          >
            {t('auth.sign_in.forgot_password')}
          </Link>
          <Link
            hx-get="/auth/sign-up"
            hx-target="#main"
            hx-swap="outerHTML"
            class="link"
          >
            {t('root.links.register')}
          </Link>
        </div>
      </div>
    </main>
  );
}
