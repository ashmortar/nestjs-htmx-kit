import { EmailInput, Link } from '@core/components';
import { Translations } from '@core/i18n/i18n.utils';

export function ForgotPassword({ t }: Translations) {
  return (
    <main class="main" id="main">
      <h1>{t('auth.forgot_password.title')}</h1>
      <div class="card">
        <div class="form-container">
          <form
            id="forgot-pass-form"
            hx-post="/auth/forgot-password"
            hx-trigger="submit"
            hx-swap="none"
            class="mb-2"
          >
            <EmailInput
              title={t('auth.forgot_password.email') ?? ``}
              label={t('auth.forgot_password.email') ?? ``}
            />
            <button class="btn-primary" type="submit">
              {t('auth.forgot_password.submit')}
            </button>
          </form>
          <Link
            hx-get="/auth/sign-in"
            class="link mb-2"
            hx-target="#main"
            hx-swap="outerHTML"
          >
            {t('root.links.sign_in')}
          </Link>
          <Link
            hx-get="/auth/register"
            class="link"
            hx-target="#main"
            hx-swap="outerHTML"
          >
            {t('root.links.register')}
          </Link>
        </div>
      </div>
    </main>
  );
}
