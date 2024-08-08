import { Translations } from '@core/i18n/i18n.utils';
import { Header, Footer } from '@core/components';
import { SessionWithUserPii } from '@core/users/users.service';

export function HtmlDoc(
  props: Html.PropsWithChildren<{
    debugHtmx?: boolean;
    session?: SessionWithUserPii;
  }> &
    Translations,
) {
  return (
    <>
      {'<!doctype html>'}
      <html lang="en" class="h-full">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>{props.t('meta.title')}</title>
          <meta name="description" content={props.t('meta.description')} />
          <script src="/htmx.min.js"></script>
          <script src="/flowbite.min.js"></script>
          <link href="/styles.css" rel="stylesheet" />
          {props.debugHtmx ? (
            <script>{`
htmx.logger = function(elt, event, data) {
    if(console) {
        console.log(event, elt, data);
    }
}
          `}</script>
          ) : undefined}
          <script>{`
    // On page load or when changing themes, best to add inline in head to avoid FOUC
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark')
    }
`}</script>
        </head>
        <body class="h-full flex flex-col">
          <Header t={props.t} session={props.session} links={[]} />
          {props.children}
          <Footer t={props.t} />
        </body>
      </html>
    </>
  );
}
