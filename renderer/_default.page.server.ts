import { renderToString } from '@vue/server-renderer';
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr';
import { createPageApp } from './app';
import logoUrl from '../assets/logo.svg';
import type { PageContextServer } from './types';

export { render };
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'apolloInitialState'];

// В конфиге включили пререндер для всех страниц
// В дефолтном серверном файле сделали чтобы ни одна страница не перерендеривалась
// Если хотим сделать ссг страницу, рядом с ней нужно положить файл something.server.ts
// и экспортировать const doNotPrerender = false;
export const doNotPrerender = true;

async function render(pageContext: PageContextServer) {
  // Когда мы называем страницу something.page.client.vue
  // плагин понимает что это клинет онли страница, и Page здесь не будет
  // В корень приложения мы в таком случае не хотим ничего встраивать
  const app = createPageApp(pageContext, false, pageContext.apolloClient);
  const appHtml = pageContext.Page ? await renderToString(app) : '';
  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext.exports;
  const title = (documentProps && documentProps.title) || 'Vite SSR app';
  const desc =
    (documentProps && documentProps.description) ||
    'App using Vite + vite-plugin-ssr';

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(appHtml || '')}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      apolloInitialState: pageContext.apolloClient?.extract(),
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  };
}
