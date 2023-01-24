import { createSSRApp, defineComponent, h, markRaw, reactive } from 'vue';
import PageShell from './PageShell.vue';
import { setPageContext } from './usePageContext';
import type { PageContext } from './types';

export { createApp }

function createApp(pageContext: PageContext) {
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

  const app = createSSRApp(PageWithLayout);

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