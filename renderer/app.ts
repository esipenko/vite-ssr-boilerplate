import { createSSRApp, defineComponent, h, markRaw, reactive, createApp } from 'vue';
import PageShell from '../layouts/PageShell.vue';
import { setPageContext } from '../composables/usePageContext';
import type { PageContext } from './types';
import i18n from '../locales/i18n-config';

export { createPageApp }

function createPageApp(pageContext: PageContext, clientOnly: boolean) {
  const { Page } = pageContext;

  let rootComponent: any;

  const PageWithLayout = defineComponent({
    data: () => ({
      Page: markRaw(Page),
      pageProps: markRaw(pageContext.pageProps || {})
    }),
    created() {
      rootComponent = this;
    },
    render() {
      return h(
        PageShell,
        {},
        {
          default: () => {
            return h(this.Page, this.pageProps)
          }
        }
      )
    }
  })


  const app = clientOnly ? createApp(PageWithLayout) : createSSRApp(PageWithLayout);
  app.use(i18n);

  const pageContextReactive = reactive(pageContext);
  const changePage = (pageContext: PageContext) => {
    Object.assign(pageContextReactive, pageContext)
    rootComponent.Page = markRaw(pageContext.Page)
    rootComponent.pageProps = markRaw(pageContext.pageProps || {})
  }

  objectAssign(app, { changePage });

  setPageContext(app, pageContextReactive)

  return app
}

// Функиця которую я нашел в репозитории с примерами. 
// Обычный Object.assign но с типами
function objectAssign<Obj extends {}, ObjAddendum>(obj: Obj, objAddendum: ObjAddendum): asserts obj is Obj & ObjAddendum {
  Object.assign(obj, objAddendum)
}