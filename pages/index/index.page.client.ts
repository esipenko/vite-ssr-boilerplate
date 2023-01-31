// В конфиге включили пререндер для всех страниц
// В дефолтном серверном файле (_default.page.server) сделали чтобы ни одна страница не перерендеривалась
// Если хотим сделать ссг страницу, рядом с ней нужно положить файл something.server.ts
// и экспортировать const doNotPrerender = false;
import testFetchOnBeforeRender from '@/utils/testFetchOnBeforeRender';

export { onBeforeRender };

async function onBeforeRender() {
  return await testFetchOnBeforeRender();
}
