import { Input, Link } from '@core/components';
import { Translations } from '@core/i18n/i18n.utils';

const formTargetId = 'forgot-pass-form' as const;

export function ForgotPassword({ t }: Translations) {
  return (
    <main class="main" id="main">
      <h1>{t('auth.forgot_password.title')}</h1>
      <div class="card">
        <div>
          <form
            id={formTargetId}
            hx-post="/auth/forgot-password"
            hx-trigger="change"
          >
            <Input
              type="email"
              name="email"
              title={t('auth.forgot_password.email') ?? ``}
              label={t('auth.forgot_password.email') ?? ``}
            />
            <button type="submit">{t('auth.forgot_password.submit')}</button>
          </form>
          <Link
            hx-get="/auth/sign-in"
            class="link"
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

ForgotPassword.formTargetId = formTargetId;
