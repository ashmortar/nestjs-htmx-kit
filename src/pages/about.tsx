import { Heading1, MainContent, Paragraph } from '@core/components';

import type { Translations } from '@core/i18n/i18n.utils';

export function About({ t }: Translations) {
  return (
    <MainContent>
      <Heading1>{t('about.title')}</Heading1>
      <Paragraph>{t('about.description')}</Paragraph>
    </MainContent>
  );
}
