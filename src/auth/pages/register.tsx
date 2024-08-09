import {
  Button,
  EmailInput,
  Heading1,
  Link,
  MainContent,
  PasswordInput,
  ConfirmPasswordInput,
} from '@core/components';

import { Translations } from '@core/i18n/i18n.utils';

export function Register({ t }: Translations) {
  return (
    <MainContent>
      <Heading1>{t('auth.register.title')}</Heading1>
      <div class="card">
        <div class="form-container">
          <form
            id="register-form"
            hx-post="/auth/register"
            hx-trigger="submit"
            hx-swap="none"
            class="mb-2"
          >
            <EmailInput t={t} />
            <PasswordInput t={t} />
            <ConfirmPasswordInput t={t} />
            <Button type="submit">{t('auth.register.submit')}</Button>
          </form>
          <Link
            hx-get="/auth/sign-in"
            hx-target="#main"
            hx-swap="outerHTML"
            class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            {t('root.links.sign_in')}
          </Link>
        </div>
      </div>
    </MainContent>
  );
}
