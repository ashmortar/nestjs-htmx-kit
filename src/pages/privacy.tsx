import { Heading1, MainContent, Paragraph } from '@core/components';
import { Translations } from '@core/i18n/i18n.utils';

export function Privacy({ t }: Translations) {
  return (
    <MainContent>
      <Heading1>{t('privacy.title')}</Heading1>
      <Paragraph>{t('privacy.description')}</Paragraph>
    </MainContent>
  );
}
