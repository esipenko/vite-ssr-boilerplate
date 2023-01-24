import { createPageApp } from './app';
import type { PageContextClient } from './types';
// Эта функция отвечает за то как будет рендериться наша страница на клиенте.
// Для каждой странице можно написать свой рендерер в зависимости от потребностей.
// На текущем этапе мне нужно чтобы прилоежние работало в режиме SSR.
// То есть, чтобы html мы получали только при первом запросе, и вся остальная навигация
// происходила на клиенте 
export { render };
// https://vite-plugin-ssr.com/server-routing-vs-client-routing
// Если тру, роутинг происходит на клиенте. Клиент не запрашивает каждый раз новый html.
// Если фолз, на каждый переход внутри сайта запрашивается новый html 
export const clientRouting = true;
// https://vite-plugin-ssr.com/clientRouting#link-prefetching
// Как мы хотим подгружать ресурсы из отрисованых ссылок
// { when: HOVER } - при наведении мышки
// { when: VIEWPORT } - при попадании ссылки во вью порте
// false - не хотим
export const prefetchStaticAssets = { when: 'HOVER' };

let app: ReturnType<typeof createPageApp>;

// pageContext - объект плагина, в котором хранятся все данные о текущей странице.
async function render(pageContext: PageContextClient) {
  if (!app) {
    // Если внутри html который пришел с бека нет контента, считаем что это клинет онли страница
    app = createPageApp(pageContext, document.getElementById("page")?.innerHTML === "");
    app.mount('#app');
  } else {
    app.changePage(pageContext);
  }
}

