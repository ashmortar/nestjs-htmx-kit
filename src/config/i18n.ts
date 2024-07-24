import { AcceptLanguageResolver, I18nOptions } from 'nestjs-i18n';
import * as path from 'node:path';

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
