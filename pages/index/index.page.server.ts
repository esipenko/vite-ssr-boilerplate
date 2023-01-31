// В конфиге включили пререндер для всех страниц
// В дефолтном серверном файле (_default.page.server) сделали чтобы ни одна страница не перерендеривалась
// Если хотим сделать ссг страницу, рядом с ней нужно положить файл something.server.ts
// и экспортировать const doNotPrerender = false;
export const doNotPrerender = false;
import { PageContextServer } from '@/renderer/types';
import testFetchOnBeforeRender from '@/utils/testFetchOnBeforeRender';

export { onBeforeRender };

async function onBeforeRender(pageContext: PageContextServer) {
  return await testFetchOnBeforeRender(pageContext);
}
