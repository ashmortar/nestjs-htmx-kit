import { Heading1, MainContent, Paragraph } from '@core/components';

import { Translations } from '@core/i18n/i18n.utils';

export function Contact({ t }: Translations) {
  return (
    <MainContent>
      <Heading1>{t('contact.title')}</Heading1>
      <Paragraph>{t('contact.description')}</Paragraph>
    </MainContent>
  );
}
