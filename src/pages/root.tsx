import { Heading1, Paragraph, MainContent } from '@core/components';
import type { Translations } from '@core/i18n/i18n.utils';

export function Index({ t }: Translations) {
  return (
    <MainContent>
      <Heading1>{t('root.welcome')}</Heading1>
      <Paragraph>{t('root.description')}</Paragraph>
    </MainContent>
  );
}
