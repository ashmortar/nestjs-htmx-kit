import { Heading1, MainContent, Paragraph } from '@core/components';
import type { Translations } from '@core/i18n/i18n.utils';

export function Tou({ t }: Translations) {
  return (
    <MainContent>
      <Heading1>{t('tou.title')}</Heading1>
      <Paragraph>{t('tou.description')}</Paragraph>
    </MainContent>
  );
}
