import { Link, EmailInput, PasswordInput } from '@core/components';

import { Translations } from '@core/i18n/i18n.utils';

export function SignIn({ t }: Translations) {
  return (
    <main class="main" id="main">
      <h1>{t('auth.sign_in.title')}</h1>
      <div class="card">
        <div class="form-container">
          <form
            id="sign-in-form"
            hx-post="/auth/sign-in"
            hx-trigger="submit"
            hx-swap="none"
            class="mb-2"
          >
            <EmailInput
              title={t('auth.sign_in.email') ?? ``}
              label={t('auth.sign_in.email') ?? ``}
            />
            <PasswordInput label={t('auth.sign_in.password') ?? ``} />
            <button class="btn-primary" type="submit">
              {t('auth.sign_in.submit')}
            </button>
          </form>
          <Link
            hx-get="/auth/forgot-password"
            hx-target="#main"
            hx-swap="outerHTML"
            class="link mb-2"
          >
            {t('auth.sign_in.forgot_password')}
          </Link>
          <Link
            hx-get="/auth/register"
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
