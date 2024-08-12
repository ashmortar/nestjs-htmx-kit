import * as path from 'node:path';
import type { I18nOptions } from 'nestjs-i18n';
import { AcceptLanguageResolver } from 'nestjs-i18n';

const i18n_opts = {
  fallbackLanguage: 'en',
  loaderOptions: {
    path: path.join(__dirname, '..', 'i18n'),
    watch: true,
  },
  resolvers: [AcceptLanguageResolver],
  typesOutputPath: path.join(
    __dirname,
    '..',
    '..',
    'generated',
    'i18n',
    'index.ts',
  ),
} satisfies I18nOptions;

export default i18n_opts;
