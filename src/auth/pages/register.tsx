import { EmailInput, Input, Link, PasswordInput } from '@core/components';
import { Translations } from '@core/i18n/i18n.utils';

export function Register({ t }: Translations) {
  return (
    <main class="main" id="main">
      <h1>{t('auth.register.title')}</h1>
      <div class="card">
        <div class="form-container">
          <form
            id="register-form"
            hx-post="/auth/register"
            hx-trigger="submit"
            hx-swap="none"
            class="mb-2"
          >
            <EmailInput
              title={t('auth.register.email') ?? ``}
              label={t('auth.register.email') ?? ``}
            />
            <PasswordInput label={t('auth.register.password') ?? ``} />
            <button class="btn-primary" type="submit">
              {t('auth.register.submit')}
            </button>
          </form>
          <Link
            hx-get="/auth/sign-in"
            class="link"
            hx-target="#main"
            hx-swap="outerHTML"
          >
            {t('root.links.sign_in')}
          </Link>
        </div>
      </div>
    </main>
  );
}
