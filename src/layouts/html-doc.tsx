export function HtmlDoc(
  props: Html.PropsWithChildren<{ title?: string; debugHtmx?: boolean }>,
) {
  return (
    <>
      {'<!doctype html>'}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>{props.title || 'Hello World!'}</title>
          <script src="https://cdn.jsdelivr.net/npm/htmx.org/dist/htmx.js"></script>
          <link rel="stylesheet" type="text/css" href="/normalize.css" />
          <link rel="stylesheet" type="text/css" href="/globals.css" />
          <link rel="stylesheet" type="text/css" href="/styles.css" />
          {props.debugHtmx && (
            <script>{`
htmx.logger = function(elt, event, data) {
    if(console) {
        console.log(event, elt, data);
    }
}
          `}</script>
          )}
        </head>
        <body>{props.children}</body>
      </html>
    </>
  );
}
