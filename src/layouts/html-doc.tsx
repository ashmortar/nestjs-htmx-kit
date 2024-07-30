import { Translations } from '@core/i18n/i18n.utils';
import { Header, Footer } from '@core/components';

export function HtmlDoc(
  props: Html.PropsWithChildren<{ debugHtmx?: boolean }> & Translations,
) {
  return (
    <>
      {'<!doctype html>'}
      <html lang="en" class="html">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>{props.t('meta.title')}</title>
          <meta name="description" content={props.t('meta.description')} />
          <script src="https://cdn.jsdelivr.net/npm/htmx.org/dist/htmx.js"></script>
          <link rel="stylesheet" type="text/css" href="/normalize.css" />
          <link rel="stylesheet" type="text/css" href="/unocss.css" />
          {props.debugHtmx ? (
            <script>{`
htmx.logger = function(elt, event, data) {
    if(console) {
        console.log(event, elt, data);
    }
}
          `}</script>
          ) : undefined}
        </head>
        <body class="body">
          <Header t={props.t} />
          {props.children}
          <Footer t={props.t} />
        </body>
      </html>
    </>
  );
}
