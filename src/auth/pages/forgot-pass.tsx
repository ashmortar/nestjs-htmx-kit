import {
  Button,
  EmailInput,
  Heading1,
  Link,
  MainContent,
} from '@core/components';

import { Translations } from '@core/i18n/i18n.utils';

export function ForgotPassword({ t }: Translations) {
  return (
    <MainContent>
      <Heading1>{t('auth.forgot_password.title')}</Heading1>
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
        <Button type="submit">{t('auth.forgot_password.submit')}</Button>
      </form>
      <Link
        hx-get="/auth/sign-in"
        hx-target="#main"
        hx-swap="outerHTML"
        class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
      >
        {t('root.links.sign_in')}
      </Link>
      <Link
        hx-get="/auth/register"
        hx-target="#main"
        hx-swap="outerHTML"
        class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
      >
        {t('root.links.register')}
      </Link>
    </MainContent>
  );
}
