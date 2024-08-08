import {
  Link,
  EmailInput,
  PasswordInput,
  Heading1,
  MainContent,
  Button,
} from '@core/components';
import { Translations } from '@core/i18n/i18n.utils';

export function SignIn({ t }: Translations) {
  return (
    <MainContent>
      <Heading1>{t('auth.sign_in.title')}</Heading1>
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
        <Button type="submit">{t('auth.sign_in.submit')}</Button>
      </form>
      <Link
        hx-get="/auth/forgot-password"
        hx-target="#main"
        hx-swap="outerHTML"
        class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
      >
        {t('auth.sign_in.forgot_password')}
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
